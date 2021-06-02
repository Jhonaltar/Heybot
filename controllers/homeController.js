const User = require('../database/models/User');
const Contrato = require('../database/models/Contrato');
const Tickets = require('../database/models/Ticket');
const Reportes = require('../database/models/Reporte');
const Antenas = require('../database/models/Antena');
const Fibras = require('../database/models/Fibra');
const moment = require('moment')

exports.home = async (req, res) =>{

    consultas = [];
    consultas.push(User.findAll({}));
    consultas.push(Contrato.findAll({}));
    consultas.push(Tickets.findAll({ include:[{model: User },{model: Contrato}],where:{estado: false}}));
    consultas.push(Reportes.findAll({ include:[{model: User },{model: Contrato}] }));
    consultas.push(Antenas.findAll({where:{estado: true}}));
    consultas.push(Antenas.findAll({where:{estado: false}}));
    consultas.push(Fibras.findAll({where:{estado: true}}));
    consultas.push(Fibras.findAll({where:{estado: false}}));

    const [usuarios, contratos,tickets,reportes, antena_si,antena_no,fibra_si,fibra_no] = await Promise.all(consultas);

    res.render('home',{
        nombrePagina: 'Inicio',
        usuarios,
        contratos,
        tickets,
        reportes,
        antena_si,
        antena_no,
        fibra_si,
        fibra_no,
        moment
    })
}