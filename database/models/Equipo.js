/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Equipo extends Model {
        static associate({ contratos, cajas, antenas }) {
            this.belongsTo(contratos, {
                    foreignKey: 'contrato_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                this.belongsTo(cajas, {
                    as: 'caja',
                    foreignKey: 'caja_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                })
            this.belongsTo(antenas, {
                as: 'antena',
                foreignKey: 'antena_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }
    Equipo.init({
        ont_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contrato_id: {
            type: DataTypes.INTEGER,
        },
        potencia: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            default: null
        },
        caja_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaut: null
        },
        antena_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dispositivos: {
            type: DataTypes.INTEGER
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'equipos'
    });
    return Equipo;
} */

const Sequelize = require('sequelize');
const db = require('../config/db');
const Contrato = require('../models/Contrato');
const Fibra = require('../models/Fibra');
const Antena = require('../models/Antena');
const User = require('../models/User')

const Equipo = db.define('equipo',{
    ont_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    potencia: {
        type: Sequelize.INTEGER,
        defaultValue : 0
    },
    señal: {
        type: Sequelize.INTEGER,
        defaultValue : 0
    },
    dispositivos: {
        type: Sequelize.INTEGER
    },
    contraseña: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Equipo.belongsTo(User, {
    foreignKey: {
      name: 'cliente_id'
    }
  });
  Equipo.belongsTo(Contrato, {
    foreignKey: {
      name: 'contrato_id'
    }
  });
Equipo.belongsTo(Fibra, {
    foreignKey: {
      name: 'caja_id'
    }
  });
Equipo.belongsTo(Antena, {
    foreignKey: {
      name: 'antena_id'
    }
  });

module.exports = Equipo;