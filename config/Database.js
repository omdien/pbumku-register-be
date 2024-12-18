import {Sequelize} from "sequelize";

const db = new Sequelize('hc','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;