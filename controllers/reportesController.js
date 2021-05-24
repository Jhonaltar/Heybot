const Reportes = require('../database/models/Reporte');
const Contrato = require('../database/models/Contrato');
const User = require('../database/models/User');

exports.listadoReportes= async (req, res)=>{

    consultas =  []; 
    consultas.push(Reportes.findAll({ include:[{model: User },{model: Contrato}] }))
    consultas.push(Reportes.findAll({where:{solucionado: true}}))
    consultas.push(Reportes.findAll({where:{solucionado: false}}))

    const [reportes, sol_si, sol_no] = await Promise.all(consultas);

    res.render('reportes',{
        nombrePagina: 'Listado de Reportes',
        reportes,
        sol_si,
        sol_no
    })
}