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
            allowNull: false
        },
        cedula: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: Sequelize.STRING,
})



module.exports= User;