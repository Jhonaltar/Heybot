/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contrato extends Model {
        static associate({ clientes, reportes, planes, facturas, equipos, tickets }) {
            this.belongsTo(clientes, {
                    foreignKey: 'cliente_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }),
                this.belongsTo(planes, {
                    foreignKey: 'plan_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }),
                this.hasMany(facturas, {
                    foreignKey: 'contrato_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }),
                this.hasMany(tickets, {
                    foreignKey: 'contrato_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }),
                this.hasOne(equipos, {
                    foreignKey: 'contrato_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }),
                this.hasMany(reportes, {
                    foreignKey: 'contrato_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                })
        }
    }
    Contrato.init({
        contrato_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        direccion: {
            type: DataTypes.STRING,

        },
        cliente_id: {
            type: DataTypes.INTEGER,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        plan_id: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'contratos'
    });
    return Contrato;
} */

const Sequelize = require('sequelize');
const db = require('../config/db');
const Planes = require('../models/Plan');
const User = require('../models/User');

const Contrato = db.define('contrato',{
    contrato_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    direccion: {
        type: Sequelize.STRING,

    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

/* Contrato.belongsTo(User);
Contrato.belongsTo(Planes); */

Contrato.belongsTo(User, {
    foreignKey: {
      name: 'cliente_id'
    }
  });
Contrato.belongsTo(Planes, {
    foreignKey: {
      name: 'plan_id'
    }
  })

module.exports = Contrato

