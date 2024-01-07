require('dotenv').config();

console.log("Connecting  to database");

const databaseConfig  ={
    
    developement: {
        host: process.env.DB_HOSTNAME       || 'localhost',
        port: process.env.DB_PORT           || 5432,
        user: process.env.DB_USERNAME       || 'postgres',
        password: process.env.DB_PASSWORD   || 'toor',
        database: process.env.DB_DATABASE   || 'smartq_db',
    },
    production:{
        // Production database configuration
    }
}

console.log("Successfully connected to database");
module.exports = databaseConfig;