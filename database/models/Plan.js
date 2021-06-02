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