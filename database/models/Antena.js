const Sequelize = require('sequelize');
const db = require('../config/db');

const Antena = db.define('antena',{
    antena_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
         allowNull: false,
            validate:{
            notEmpty: {
                msg: 'Por favor, ingrese su nombre de antena'
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
    }
})

module.exports = Antena