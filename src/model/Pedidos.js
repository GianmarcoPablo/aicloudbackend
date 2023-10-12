import { Sequelize } from "sequelize"
import db from "../config/db.js"


const Pedidos = db.define('Pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productos: {
        type: Sequelize.JSON,
        allowNull: false
    },
});

Pedidos.sync()


export default Pedidos

