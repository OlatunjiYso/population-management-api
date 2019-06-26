import mysql from 'mysql';
import 'dotenv/config';

const databaseConfig = {
  development: {
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB
  },
  test: {
    host: process.env.LOCAL_TEST_DB_HOST,
    user: process.env.LOCAL_TEST_DB_USER,
    password: process.env.LOCAL_TEST_DB_PASSWORD,
    database: process.env.LOCAL_TEST_DB
  },
  travis: {
    host: process.env.TRAVIS_DB_HOST,
    user: process.env.TRAVIS_DB_USER,
    database: process.env.TRAVIS_DB
  }
}

const client = mysql.createConnection(databaseConfig[process.env.NODE_ENV])

const makeConnection = ()=> {
  client.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to ${process.env.NODE_ENV} database`);
  });
}


const db = { client, makeConnection } 

export default db;