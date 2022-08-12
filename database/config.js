// this file is used for getting the basic config for the MS SQL setup connection

const dbConfig = {
    host: process.env.SQL_SERVER || 'localhost',
    database: process.env.DB_NAME || 'PureMatters',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PW || '',
};

module.exports = { dbConfig };
