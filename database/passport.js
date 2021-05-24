const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Login = require('./models/Login');

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    },
    async(correo ,password, next)=>{
        const usuario = await Login.findOne({where: {correo}});

        if (!usuario) return next(null, false,{
            message: 'El Usuario no existe'
        })
        const velidarPassword = usuario.verificarPassword(password)
        if (!velidarPassword) return next(null, false, {
            message: 'Contraseña Incorrecta'
        });

        return next(null, usuario);
    }
))

passport.serializeUser(function (usuario, cb) {
    cb(null, usuario)
});

passport.deserializeUser(function (usuario, cb) {
    cb(null, usuario)
});

module.exports= passport;