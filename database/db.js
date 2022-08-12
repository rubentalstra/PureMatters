const mysql = require('mysql');
const { dbConfig } = require('./config');

var poolPromise;
try {
    poolPromise = new mysql.createPool(dbConfig);
    console.log('Connected to MYSQL');
} catch (error) {
    console.log('Database Connection Failed! Bad Config: ', error);
    return console.log(error);
}

module.exports = {
    poolPromise,
};
