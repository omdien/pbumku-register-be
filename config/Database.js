import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db_hc = new Sequelize('hc', 'root', '', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export default db_hc;