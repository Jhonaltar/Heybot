const Contrato = require('../database/models/Contrato');
const User = require('../database/models/User');
const Planes = require('../database/models/Plan');

exports.listadoContratos = async (req, res)=>{

    const consultas = [];
    consultas.push(Contrato.findAll({ 
        order: [['contrato_id', 'ASC']],
        include:[{model: User },{model: Planes}]
    }));
    consultas.push(User.findAll({}))
    consultas.push(Planes.findAll({}))
    
    const [contratos, usuarios, planes] = await Promise.all(consultas);
    res.render('contratos',{
        nombrePagina: 'Contrato',
        contratos,
        usuarios,
        planes
    })
}

exports.nuevoContrato = async (req, res) =>{
    const contrato = req.body;
    try {
      await Contrato.create(contrato);
      req.flash('success', 'Se ha registrado correctamente');
    res.redirect('/contratos')  
    } catch (error) {
        console.log('error','datos vacios', error);
        req.flash('danger', 'Se hubo un error, registre nuevamente');
    }
}
/* JSON.stringify */
exports.editContrato = async (req, res) =>{
    const contrato = await Contrato.findOne({where: {contrato_id : req.params.contrato_id}});
    const{cliente_id, plan_id, direccion, estado}= req.body

    contrato.direccion = direccion
    contrato.estado = estado
    contrato.cliente_id = cliente_id
    contrato.plan_id = plan_id

    await contrato.save();
    req.flash('success', 'Se ha actualizado correctamente');
    res.redirect('/contratos')
}


exports.eliminarContrato = async (req,res) =>{
    await Contrato.destroy({
        where: {contrato_id: req.params.contrato_id}
    });
    req.flash('success', 'Se ha eliminado correctamente');
    res.redirect('/contratos')
}