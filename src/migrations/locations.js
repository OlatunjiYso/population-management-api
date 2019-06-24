import db from '../models/index';

const dbClient = db.client;

const createLocationsTable = () => {
  const sqlQuery = `CREATE TABLE Locations (
    LocationID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    UNIQUE (LocationID),
    PRIMARY KEY (LocationID)
);`;

dbClient.query(sqlQuery, (err, result) => {
  if( err ) {
    if (err.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('Locations table already exist')
    } else {
      throw err;
    }
  } else {
    console.log('Locations table created');
  }
});
}

const dropLocationsTable = () => {
  const sqlQuery = `DROP TABLE Locations;`
  dbClient.query(sqlQuery, (err) => {
    if(err) {
      if(err.code === 'ER_BAD_TABLE_ERROR') {
        console.log('Locations table is not found!')
      } else {
        throw err;
      }
    } else {
      console.log('Locations table has been dropped!')
    }
  });
}

const locationsMigrations = { createLocationsTable, dropLocationsTable }

export default locationsMigrations;