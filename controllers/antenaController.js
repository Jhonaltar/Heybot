const Antena = require('../database/models/Antena');

exports.listadoAntenas = async (req, res) =>{
    const antenas = await Antena.findAll({});

    res.render('antenas',{
        nombrePagina: 'Antenas',
        antenas
    })
}

exports.nuevaAntena= async (req, res) =>{
    const antena = req.body;
    try {
        await Antena.create(antena);
        req.flash('success', 'Se ha registrado correctamente');
        res.redirect('/antenas') 
    } catch (error) {
        const erroresSequelize = error.errors.map((err) => err.message);
        req.flash('danger', erroresSequelize);
        res.redirect('/antenas');
    }
}

exports.editarAntena = async( req, res ) =>{
    const antena = await Antena.findOne({where:{ antena_id : req.params.antena_id}})

    const {nombre, estado} = req.body

    antena.nombre = nombre
    antena.estado = estado
    try {
        await antena.save();
        req.flash('success', 'Se ha actualizado correctamente');
        res.redirect('/antenas');
    } catch (error) {
        req.flash('danger', 'No puede dejar campos vacios en editar');
        res.redirect('/antenas');
    }
}

exports.eliminarAntena = async(req, res) => {
    await Antena.destroy({
        where:{antena_id : req.params.antena_id}
    });
    req.flash('success', 'Se ha eliminado correctamente');
    res.redirect('/antenas')
}