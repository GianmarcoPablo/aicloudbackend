import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Administradores = db.define("administradores", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Nombre del administrador
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Correo electrónico del administrador
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    // Contraseña del administrador
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Administradores