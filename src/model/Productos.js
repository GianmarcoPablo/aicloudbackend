import { Sequelize } from "sequelize"
import db from "../config/db.js"


const Producto = db.define('productos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING,
    }
});

Producto.sync()


export default Producto

