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
    const ticket= req.body;
    ticket.fechaatencion=null

    req.checkBody('cliente_id', 'Por favor, escoger un cliente' ).notEmpty();
    req.checkBody('contrato_id', 'Por favor, escoja un contrato' ).notEmpty();
    req.checkBody('descripcion', 'Por favor, escriba una descripcion ' ).notEmpty();
    req.checkBody('estado', 'Por favor, escoja un estado' ).notEmpty();
    const erroresExpress = req.validationErrors();
    try {
      await Tickets.create(ticket);
      req.flash('success', 'Se ha registrado correctamente');
    res.redirect('/tickets')  
    } catch (error) {
        const errExp = erroresExpress.map(err => err.msg)
        req.flash('danger', errExp);
        res.redirect('/tickets')
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