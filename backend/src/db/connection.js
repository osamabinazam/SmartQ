
const  pgp = require('pg-promise')();
const databaseConfig = require('../config/database');

const  db = pgp(databaseConfig.developement);
console.log("Connecting  to database");
const initailizeDatabase = async  () =>{
    console.log("Initializing the database");
    if (process.env.INITIALIZE_DB === 'true'){
        try{
            await db.none(`CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
              )`);
              console.log("Table  created Successfully");
        }catch(err){
            console.log("Error executing query: " + err);
        }
    }
    else{
        console.log("Database initialization skipped");
    }
};

console.log("Successfully connected to database");
initailizeDatabase();

module.exports = db;