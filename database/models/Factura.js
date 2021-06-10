const Sequelize = require('sequelize');
const db = require('../config/db');
const Contrato = require('../models/Contrato');
const User = require('../models/User');

const Factura = db.define('facturas',{
    factura_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtotal: {
        type: Sequelize.DECIMAL,
    },
    descuento: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
    },
    iva: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1.12,

    },
    total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
    },
    fechacreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
})

Factura.belongsTo(User, {
    foreignKey: {
      name: 'cliente_id'
    }
  })
Factura.belongsTo(Contrato, {
    foreignKey: {
      name: 'contrato_id'
    }
  })

module.exports = Factura;