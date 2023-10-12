import { Sequelize } from "sequelize"
import db from "../config/db.js"


const Blog = db.define('blogs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING,
    }
});

Blog.sync()

export default Blog

