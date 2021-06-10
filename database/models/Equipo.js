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
    },
    timeequipo:{
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW
    },
    timewan:{
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW
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