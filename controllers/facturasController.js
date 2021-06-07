const Facturas = require('../database/models/Factura');
const Contrato = require('../database/models/Contrato');
const User = require('../database/models/User');
const moment = require('moment')


exports.ListadoFacturas= async(req, res)=>{
    const facturas = await Facturas.findAll({ include:[{model: User },{model: Contrato }]});
    res.render('facturas',{
        nombrePagina: 'Listado de Facturas',
        facturas,
        moment
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

exports.verFactura = async(req, res) =>{
    const factura = await Facturas.findOne({ where:{ factura_id :req.params.factura_id },include:[{model: User },{model: Contrato }]});

    const iva = factura.subtotal * (factura.iva/100) 
    factura.iva = iva.toFixed(2)

    if (factura.descuento > 0) {
        const descuento = (+factura.subtotal + +iva) * (+factura.descuento/100)
        const total = +factura.subtotal + +iva - +descuento
        factura.descuento = descuento.toFixed(2)
        factura.total = total.toFixed(2)
    }else{
        const descuento = (+factura.subtotal + +iva) * (+factura.descuento/100)
        const total = +factura.subtotal + +iva - +descuento
        factura.descuento = descuento.toFixed(2)
        factura.total = total.toFixed(2)
    }

    res.render('ver-factura',{
        nombrePagina: 'Listado de Facturas',
        factura,
        moment
    })
}