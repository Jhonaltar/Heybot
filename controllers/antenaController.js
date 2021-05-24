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
        console.log('error','datos vacios', error);
        req.flash('danger', 'Se hubo un error, registre nuevamente');
    }
}

exports.editarAntena = async( req, res ) =>{
    const antena = await Antena.findOne({where:{ antena_id : req.params.antena_id}})

    const {nombre, estado} = req.body

    antena.nombre = nombre
    antena.estado = estado

    await antena.save();
    req.flash('success', 'Se ha actualizado correctamente');
    res.redirect('/antenas');
}

exports.eliminarAntena = async(req, res) => {
    await Antena.destroy({
        where:{antena_id : req.params.antena_id}
    });
    req.flash('success', 'Se ha eliminado correctamente');
    res.redirect('/antenas')
}