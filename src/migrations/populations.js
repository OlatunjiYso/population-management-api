import 'dotenv/config';
import db from '../models/index';

const dbClient = db.client;

const createPopulationsTable = () => {
  const sqlQuery = `CREATE TABLE Populations (
    ID int NOT NULL AUTO_INCREMENT,
    LocationID int NOT NULL,
    FemalePopulation int NOT NULL,
    MalePopulation int NOT NULL,
    TotalPopulation int NOT NULL,
    UNIQUE (ID),
    PRIMARY KEY (ID),
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID)
);`;

dbClient.query(sqlQuery, (err) => {
  if( err ) {
    if (err.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('Populations table already exist')
    } else {
      throw err;
    }
  } else {
    console.log('Populations table created');
  }
});
}

const dropPopulationsTable = () => {
  const sqlQuery = `DROP TABLE Populations;`
  dbClient.query(sqlQuery, (err) => {
    if(err) {
      if(err.code === 'ER_BAD_TABLE_ERROR') {
        console.log('Populations table not found!')
      } else {
        throw err;
      }
    } else {
      console.log('Populations table has been dropped!')
    }
  });
}

const populationsMigrations = { createPopulationsTable, dropPopulationsTable}

export default populationsMigrations;