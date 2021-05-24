const Tickets = require('../database/models/Ticket');
const Contrato = require('../database/models/Contrato');
const moment = require('moment')

exports.listadoTickets= async (req,res)=>{

    consultas =  []; 
    consultas.push(Tickets.findAll({ include:[{model: Contrato }]}))
    consultas.push(Tickets.findAll({where:{estado: true}}))
    consultas.push(Tickets.findAll({where:{estado: false}}))
    consultas.push(Contrato.findAll({}));

    const [tickets, sol_si, sol_no,contratos] = await Promise.all(consultas);

    res.render('tickets',{
        nombrePagina: 'Listado de tickets',
        tickets,
        sol_si,
        sol_no,
        contratos,
        moment
    })
}

exports.nuevoTicket= async(req, res)=>{
    const ticket = 
    {
        contrato_id : req.body.contrato_id,
        descripcion : req.body.descripcion,
        estado : req.body.estado,
        fechaatencion: req.body.fechaatencion.moment().add(2, 'days')
    }
    /* try {
      await Tickets.create(ticket);
      req.flash('success', 'Se ha registrado correctamente');
    res.redirect('/tickets')  
    } catch (error) {
        console.log('error','datos vacios', error);
        req.flash('danger', 'Se hubo un error, registre nuevamente');
    } */
}