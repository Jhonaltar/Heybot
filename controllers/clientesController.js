const User = require('../database/models/User');

exports.listadoClientes= async ( req, res )=>{
    const clientes = await User.findAll({});

    res.render('clientes',{
        nombrePagina: 'Clientes',
        clientes
    });
};
exports.nuevoCliente= async (req,res,) =>{
    const cliente = req.body;
    
    try {
        await User.create(cliente);
        req.flash('success', 'Se ha registrado correctamente');
        res.redirect('/clientes');
    } catch (error) {
        const erroresSequelize = error.errors.map((err) => err.message);
        req.flash('danger', erroresSequelize);
        res.redirect('/clientes')
    }
}

exports.editCliente= async(req, res ) =>{
    const cliente = await User.findOne({where:{cliente_id: req.params.cliente_id}});

    const {nombre, cedula, telefono}= req.body;
    cliente.nombre = nombre
    cliente.cedula = cedula
    cliente.telefono = telefono
    try {
        await cliente.save();
        req.flash('success', 'Se ha actualizado correctamente');
        res.redirect('/clientes')
    } catch (error) {
        req.flash('danger', 'No puede dejar campos vacios en editar');
        res.redirect('/clientes')
    }

    
}

exports.eliminarCliente = async (req, res) =>{
    await User.destroy({
       where: {cliente_id: req.params.cliente_id}
    });
    req.flash('success', 'Se ha eliminado correctamente');
    res.redirect('/clientes')
}