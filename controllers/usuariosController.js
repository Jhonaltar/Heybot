const Login = require('../database/models/Login');

exports.formIniciarSesion= (req, res) =>{
    res.render('iniciar-sesion',{
        nombrePagina:'Iniciar Sesion'
    })
}

exports.formCrearCuenta = async(req, res)=>{
    const usuario = await Login.findAll({});
    console.log(usuario);
    res.render('crear-cuenta',{
        nombrePagina: 'Crea tu cuenta'
    });
}

exports.crearNuevaCuenta = async(req, res)=>{
    const usuario = req.body;
    console.log(usuario);
    try {
        const usuarioexiste = await Login.findOne({
            where:{correo: usuario.correo}
        })
        if (usuarioexiste) {
            req.flash('danger', 'Este correo ya existe');
            res.redirect('/crear-cuenta');
        }
        await Login.create(usuario);
        res.redirect('/iniciar-sesion');
    } catch (error) {
        console.log(error);
        req.flash('danger','error al registrar');
        res.redirect('/crear-cuenta');
    }
}