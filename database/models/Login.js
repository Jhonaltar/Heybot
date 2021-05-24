/* const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    class Login extends Model {
    }
    Login.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
    },
        {
            sequelize,
            timestamps: false,
            modelName: 'usuarios'
        },{
            hooks:{
                beforeCreate(usuario){
                    usuario.password = Login.usuarios.prototype.hashPassword(usuario.password)
                }
            }
        });

        Login.prototype.hashPassword = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        }

        //metodo para comprar los password
        Login.prototype.validarPassword = function (password) {
            return bcrypt.compareSync(password, this.password);
            }

    return Login;
} */

const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Login = db.define('login',{
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})

//metodos personalizados
Login.prototype.verificarPassword= function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = Login;