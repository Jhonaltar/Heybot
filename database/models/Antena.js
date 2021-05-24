/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Antena extends Model {
        static associate({ equipos }) {
            this.hasMany(equipos, {
                foreignKey: 'antena_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }
    Antena.init({
        antena_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'antenas'
    });
    return Antena;
}
 */
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
        allowNull: false
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = Antena