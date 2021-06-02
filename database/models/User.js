const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('cliente',{
    cliente_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
            notEmpty: {
                msg: 'Por favor ingrese su nombre completo'
            }
        }
        },
        cedula: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
            notEmpty: {
                msg: 'Agregar su numero de céluda'
            }
        }
        },
        telefono: Sequelize.STRING,
})



module.exports= User;