const express = require('express');
const router = express.Router();
const db = require("../database/models");
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

router.post("/newuser", [
    check('usuario', 'El usuario no puede quedar en blanco').not().isEmpty(),
    check('password', 'El password no puede quedar en blanco').not().isEmpty(),
    check('correo', 'El correo debe estar correcto').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: error.array() })
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    db.usuarios.create({
        usuario: req.body.usuario,
        correo: req.body.correo,
        password: req.body.password
    }).then(usuario => res.send(usuario))

});

router.post('/login', async (req, res) => {
    try {
        let usuario = await db.usuarios.findOne({ where: { correo: req.body.correo } });
        if (usuario) {
            const iguales = bcrypt.compareSync(req.body.contraseña, usuario.password);
            if (iguales) {
                res.json({ success: createToken(usuario) });
            } else {
                res.json({ error: ' Error en usuario y/o contraseña' });
            }
        } else {
            res.json({ error: ' Error en usuario y/o contraseña' });
        }
    } catch (err) {
        console.log(err)
    }
});

const createToken = (usuario) => {
    const payload = {
        user_id: usuario.user_id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, 'frase secreta');
};


module.exports = router;