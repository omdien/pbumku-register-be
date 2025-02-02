import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db_hc = new Sequelize('hc', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export default db_hc;