const Sequelize = require('sequelize');
const db = require('../config/db');

const Fibra =db.define('caja',{
    caja_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
        notEmpty: {
            msg: 'Por favor, ingrese su nombre completo'
        }
    }
    },
    potencia: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate:{
        notEmpty: {
            msg: 'Por favor, ingrese una potencia'
        }
    }
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
            validate:{
            notEmpty: {
                msg: 'Por favor, elija un estado'
            }
        }
    },
});

module.exports = Fibra