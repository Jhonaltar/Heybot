const Equipos = require('../database/models/Equipo');
const Contrato = require('../database/models/Contrato');
const User = require('../database/models/User');
const Antena = require('../database/models/Antena');
const Fibra = require('../database/models/Fibra');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.listadoEquipos=async(req, res)=>{
    const consultas= [];
    consultas.push(User.findAll({}))
    consultas.push(Contrato.findAll({where:{ estado: true}}))
    consultas.push(Antena.findAll({where:{ estado: true}}))
    consultas.push(Fibra.findAll({where:{ estado: true}}))
    consultas.push(Equipos.findAll({ 
        include:[{model: User },
            {model: Contrato},
            {model: Fibra},
            {model: Antena},
            ], 
            order: [['ont_id', 'ASC']],
    }))
    const [usuarios,contratos,antena,fibra,equipos] = await Promise.all(consultas);

    res.render('equipos',{
        nombrePagina: 'Equipos',
        usuarios,
        contratos,
        antena,
        fibra,
        equipos
    })
}

exports.nuevoEquipo=async(req, res) =>{
    const equipo = req.body;

    if (req.body.potencia ==='') {
        equipo.potencia= 0;
    }
    if (req.body.señal ==='') {
        equipo.señal= 0;
    }

    if (req.body.caja_id ==='') {
        equipo.caja_id= 0;
    }
    if (req.body.antena_id ==='') {
        equipo.antena_id= 0;
    }


    try {
      await Equipos.create(equipo);
      req.flash('success', 'Se ha registrado correctamente');
    res.redirect('/')  
    } catch (error) {
        console.log('error','datos vacios', error);
        req.flash('danger', 'Se hubo un error, registre nuevamente');
    }
}

exports.resultadosBusquedas= async(req, res) =>{

    const  cliente  = req.body;
    console.log('aaaaaaaaaaaa',cliente);
    if (cliente !='' ) {
        query= `where :  { 
            cliente_id: {[Op.eq]:${cliente}}
        }`
    }
    const equipos = await Equipos.findAll({ 
        query
    });

    console.log(equipos);
    /* if (cliente === '') {
        query= ''
    } else {
        query= `where :  { 
            cliente_id: {[Op.eq]:${cliente}}
        }`
    }

    const equipos = await Equipos.findAll({ 
        where:{
            cliente_id : {[Op.eq]:cliente}
        },
        include: [
            {
                model: User, 
                query
            },
        ]
    }); */


/* https://sequelize.org/v5/manual/models-usage.html */
    /* const { cliente, contrato } = req.query;
    console.log(cliente);
    let query ;
    if (cliente === '') {
        query= ''
    } else {
        query= `where :  { 
            cliente_id: {[Op.eq]:${cliente}}
        }`
    }

    if (contrato === '') {
        query= ''
    } else {
        query= `where :  { 
            contrato_id: {[Op.eq]:${contrato}}
        }`
    }

    const equipos = await Equipos.findAll({ 
        query,
        include: [
            {
                model: User, 
                attributes : ['nombre']
            },
            {
                model: Contrato, 
                attributes : ['contrato_id']
            },
            {
                model: Antena, 
                attributes : ['nombre']
            },
            {
                model: Fibra, 
                attributes : ['nombre']
            }
        ]
    }); */
    /* res.render('resultado',{
        nombrePagina:'Resultado Busqueda',
        equipos
    }) */
}