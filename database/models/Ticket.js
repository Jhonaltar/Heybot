/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        static associate({ contratos }) {
            this.belongsTo(contratos, { foreignKey: 'contrato_id' })
        }
    }
    Ticket.init({
        ticket_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contrato_id: {
            type: DataTypes.INTEGER,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        fechacreacion: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("NOW()"),
            allowNull: false,
            get() {
                return moment(this.getDataValue('fecha')).format('DD/MM/YYYY h:mm:ss');
            }

        },
        fechaatencion: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("NOW()"),
            allowNull: false,
            get() {
                return moment(this.getDataValue('fecha')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        descripcion: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'tickets'
    });
    return Ticket;
} */

const Sequelize = require('sequelize');
const db = require('../config/db');
const Contrato = require('../models/Contrato');

const Ticket = db.define('ticket',{
    ticket_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    fechacreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    fechaatencion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    descripcion: {
        type: Sequelize.STRING,
    }
});

Ticket.belongsTo(Contrato, {
    foreignKey: {
      name: 'contrato_id'
    }
  });

module.exports = Ticket;