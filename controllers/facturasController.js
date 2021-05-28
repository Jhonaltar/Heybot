const Facturas = require('../database/models/Factura');
const Contrato = require('../database/models/Contrato');
const User = require('../database/models/User');


exports.ListadoFacturas= async(req, res)=>{
    const facturas = await Facturas.findAll({ include:[{model: User },{model: Contrato }]});
    res.render('facturas',{
        nombrePagina: 'Listado de Facturas',
        facturas
    })

}

exports.formFactura= async(req,res)=>{
    const consultas= [];
    consultas.push(Facturas.findAll({ include:[{model: User },{model: Contrato }]}));
    consultas.push(User.findAll({}));
    consultas.push(Contrato.findAll({where:{ estado: true}}));

    const [facturas,usuarios,contratos] = await Promise.all(consultas);

    res.render('crear-factura',{
        nombrePagina: 'Crear Facturas',
        facturas,
        usuarios,
        contratos
    })
}