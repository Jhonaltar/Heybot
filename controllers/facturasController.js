const Facturas = require('../database/models/Factura');
const Contrato = require('../database/models/Contrato');

exports.ListadoFacturas= async(req, res)=>{
    const facturas = await Facturas.findAll({ include:[{model: Contrato }]});
    res.render('facturas',{
        nombrePagina: 'Listado de tickets',
        facturas
    })

}