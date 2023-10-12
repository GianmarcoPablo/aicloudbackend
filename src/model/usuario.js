import { Sequelize } from "sequelize"
import db from "../config/db.js"


const Usuario = db.define('usuarios', {
    // Identificador del usuario
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Nombre del usuario
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Correo electrónico del usuario
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    // Contraseña del usuario
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Usuario.sync();


export default Usuario

