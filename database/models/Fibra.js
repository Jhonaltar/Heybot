/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Fibra extends Model {
        static associate({ equipos }) {
            this.hasMany(equipos, {
                foreignKey: 'caja_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }
    Fibra.init({
        caja_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        potencia: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'cajas'
    });
    return Fibra;
} */

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
        allowNull: false
    },
    potencia: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
});

module.exports = Fibra