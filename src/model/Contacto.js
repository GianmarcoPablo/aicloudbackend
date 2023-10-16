import { Sequelize } from "sequelize"
import db from "../config/db.js"

const Contacto = db.define('contactos', {
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
    // Nombre del usuario
    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Correo electrónico del usuario
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Contraseña del usuario
    telefono: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensaje: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Contacto.sync()

export default Contacto

