const Sequelize  = require('sequelize');
//extraer valores de entorno
require('dotenv').config({path: 'variables.env'})

/* const sequelize = new Sequelize(
    'bnm1atfoirfx9rkykva3', 
    'ucid7hjzypi1mw9o', 
    'SmAY5VRWpaIGAFHzz4w5',
    {
    host: 'bnm1atfoirfx9rkykva3-mysql.services.clever-cloud.com' ,
    dialect: 'mysql',
    port:'3306',
    define:{
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}); */

const sequelize = new Sequelize(
    process.env.BD_NOMBRE, 
    process.env.BD_USER, 
    process.env.BD_PASS,
    {
    host: process.env.BD_HOST ,
    dialect: 'mysql',
    port:process.env.BD_PORT,
    define:{
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports= sequelize;