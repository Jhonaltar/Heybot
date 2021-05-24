const User = require('../database/models/User');
const Contrato = require('../database/models/Contrato');
const Tickets = require('../database/models/Ticket');
const Reportes = require('../database/models/Reporte');
const moment = require('moment')

exports.home = async (req, res) =>{

    consultas = [];
    consultas.push(User.findAll({}));
    consultas.push(Contrato.findAll({}));
    consultas.push(Tickets.findAll({ include:[{model: Contrato }]}));
    consultas.push(Reportes.findAll({ include:[{model: User },{model: Contrato}] }));

    const [usuarios, contratos,tickets,reportes] = await Promise.all(consultas);

    res.render('home',{
        nombrePagina: 'Inicio',
        usuarios,
        contratos,
        tickets,
        reportes,
        moment
    })
}