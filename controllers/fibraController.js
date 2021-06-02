const Fibra = require('../database/models/Fibra');

exports.listadoFibra=async(req,res) =>{
    const fibras = await Fibra.findAll({});

    res.render('fibra',{
        nombrePagina: 'Fibra',
        fibras
    })
}

exports.nuevoFibra = async (req, res) =>{
    const fibra = req.body;
   
    try {
        await Fibra.create(fibra);
        req.flash('success', 'Se ha registrado correctamente');
        res.redirect('/fibra') 
    } catch (error) {
        const erroresSequelize = error.errors.map((err) => err.message);
        req.flash('danger', erroresSequelize);
        res.redirect('/fibra');
    }
}

exports.editarFibra = async(req, res) =>{
    const fibra = await Fibra.findOne({where: {caja_id : req.params.caja_id}})

    const{nombre,potencia,estado} = req.body;

    fibra.nombre= nombre
    fibra.potencia= potencia
    fibra.estado= estado

    try {
        await fibra.save();
        req.flash('success', 'Se ha actualizado correctamente');
        res.redirect('/fibra');
    } catch (error) {
        req.flash('danger', 'No puede dejar campos vacios en editar');
        res.redirect('/fibra');
    }


}

exports.eliminarFibra= async(req, res) =>{
    await Fibra.destroy({
        where:{
            caja_id : req.params.caja_id
        }
    });
    req.flash('success', 'Se ha eliminado correctamente');
    res.redirect('/fibra')
}