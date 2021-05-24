const User = require('../database/models/User');

exports.listadoClientes= async ( req, res )=>{
    const clientes = await User.findAll({});

    res.render('clientes',{
        nombrePagina: 'Clientes',
        clientes
    });
};

exports.listadoClientes1= async ( req, res )=>{
    const clientes = await User.findAll({});
    res.send({ data: clientes });
};

exports.nuevoCliente= async (req,res,) =>{
    const cliente = req.body;
    
    try {
        await User.create(cliente);
        req.flash('success', 'Se ha registrado correctamente');
        res.redirect('/clientes')
    } catch (error) {
        console.log('error','datos vacios');
        req.flash('danger', 'Se hubo un error, registre nuevamente');
    }
}

exports.editCliente= async(req, res ) =>{
    const cliente = await User.findOne({where:{cliente_id:req.params.cliente_id}});

    const {nombre, cedula, telefono}= req.body;
    console.log(req.body);
    console.log('nombre', nombre);
    console.log('cedula', cedula);
    console.log('telefono', telefono);
    cliente.nombre = nombre
    cliente.cedula = cedula
    cliente.telefono = telefono
    await cliente.save();
    req.flash('success', 'Se ha actualizado correctamente');
    res.redirect('/clientes')
}

exports.eliminarCliente = async (req, res) =>{
    await User.destroy({
       where: {cliente_id: req.params.cliente_id}
    });
    req.flash('success', 'Se ha eliminado correctamente');
    res.redirect('/clientes')
}