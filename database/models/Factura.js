/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Factura extends Model {
        static associate({ contratos }) {
            this.belongsTo(contratos, { foreignKey: 'contrato_id' })
        }
    }
    Factura.init({
        factura_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contrato_id: {
            type: DataTypes.INTEGER,
        },
        subtotal: {
            type: DataTypes.DECIMAL,
        },
        descuento: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        iva: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 1.12,

        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        fecha: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("NOW()"),
            allowNull: false,
            //defaultValue: DataTypes.literal("NOW()")
            //note here this is the guy that you are looking for                   
            get() {
                return moment(this.getDataValue('fecha')).format('DD/MM/YYYY h:mm:ss');
            }
        }
        
    }, {
        sequelize,
        timestamps: false,
        // I don't want createdAt
        // I want updatedAt to actually be called updateTimestamp
        modelName: 'facturas'
    });
    return Factura;
} */

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