require('dotenv').config();

const env = process.env;

const db = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: 'root',
    password: 'root_password',
    database: env.MYSQL_DATABASE,
};

module.exports = db;
