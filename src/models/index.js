import mysql from 'mysql';
import 'dotenv/config';

const client = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD,
  database: process.env.LOCAL_DB
})

const makeConnection = ()=> {
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected to population-management-db!");
  });
}


const db = { client, makeConnection } 

export default db;