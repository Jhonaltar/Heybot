const Tickets = require('../database/models/Ticket');
const Contrato = require('../database/models/Contrato');
const User = require('../database/models/User');
const moment = require('moment')

exports.listadoTickets= async (req,res)=>{

    consultas =  []; 
    consultas.push(Tickets.findAll({ include:[{model: User },{model: Contrato }]}))
    consultas.push(Tickets.findAll({where:{estado: true}}))
    consultas.push(Tickets.findAll({where:{estado: false}}))
    consultas.push(Contrato.findAll({}));
    consultas.push(User.findAll({}))

    const [tickets, sol_si, sol_no,contratos,usuarios] = await Promise.all(consultas);

    res.render('tickets',{
        nombrePagina: 'Listado de tickets',
        tickets,
        sol_si,
        sol_no,
        contratos,
        usuarios,
        moment
    })
}

exports.nuevoTicket= async(req, res)=>{
    /* const ticket = 
    {
        contrato_id : req.body.contrato_id,
        descripcion : req.body.descripcion,
        estado : req.body.estado,
        fechaatencion: req.body.fechaatencion.moment().add(2, 'days')
    } */
    const ticket= req.body;
    ticket.fechaatencion=null
    try {
      await Tickets.create(ticket);
      req.flash('success', 'Se ha registrado correctamente');
    res.redirect('/tickets')  
    } catch (error) {
        console.log('error','datos vacios', error);
        req.flash('danger', 'Se hubo un error, registre nuevamente');
    }
}

exports.editarTicket= async(req, res)=>{
    const ticket = await Tickets.findOne({where: {ticket_id: req.params.ticket_id}});

    const {estado,fechaatencion, descripcion}= req.body;

    ticket.estado= estado;
    ticket.fechaatencion= fechaatencion;
    ticket.descripcion = descripcion;

    await ticket.save();
    req.flash('success', 'Se ha actualizado correctamente');
    res.redirect('/tickets');

}