const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorio'
});

exports.usuarioAutenticado=( req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion= (req,res,next)=>{
    req.logout();
    req.flash('success','Has cerrado sesion correctamente');
    res.redirect('/iniciar-sesion');
    next();
}