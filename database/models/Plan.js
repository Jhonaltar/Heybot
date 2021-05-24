/* const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Plan extends Model {
        static associate({ contratos }) {
            this.hasOne(contratos, {
                foreignKey: 'plan_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }
    Plan.init({
        plan_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        megas: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'planes'
    });
    return Plan;

} */

const Sequelize = require('sequelize');
const db = require('../config/db');

const Plan = db.define('planes',{
    plan_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    megas: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Plan; 