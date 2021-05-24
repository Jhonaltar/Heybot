/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reporte extends Model {
        static associate({ clientes, contratos }) {
            this.belongsTo(clientes, {
                foreignKey: 'cliente_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
            this.belongsTo(contratos, {
                foreignKey: 'contrato_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }
    Reporte.init({
        reporte_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cliente_id: {
            type: DataTypes.INTEGER,
        },
        contrato_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        requerimiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        solucionado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }

    }, {
        sequelize,
        timestamps: false,
        modelName: 'reportes'
    });
    return Reporte;
} */

const Sequelize = require('sequelize');
const db = require('../config/db');
const Contrato = require('../models/Contrato');
const User = require('../models/User');

const Reporte = db.define('reporte',{
    reporte_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requerimiento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    solucionado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    motivo: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    fechacreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
    /* fechacreacion: {
        type: "TIMESTAMP",
        type: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        get() {
            return moment(this.getDataValue('fecha')).format('DD/MM/YYYY h:mm:ss');
        }
    } */
    
        
});

Reporte.belongsTo(User, {
    foreignKey: {
      name: 'cliente_id'
    }
  });
Reporte.belongsTo(Contrato, {
    foreignKey: {
      name: 'contrato_id'
    }
  });

module.exports = Reporte;