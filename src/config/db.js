import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

const db = new Sequelize(process.env.MYSQL_NAME_DB, process.env.MYSQL_USER_DB, process.env.MYSQL_PASSWORD_DB, {
    host: process.env.MYSQL_HOST_DB,
    port: process.env.MYSQL_PORT_DB,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorAliases: false
});

export default db;


console.log(process.env.MYSQL_NAME_DB);