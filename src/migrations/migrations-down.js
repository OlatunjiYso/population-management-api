import db from '../models';
import locationsMigrations from './locations';
import populationMigrations from './populations';

const dbClient = db.client;
dbClient.query("USE PopulationManagement;", (err, result) => {
  if(err) { throw err; }
});

const dropMigrations = () => {
  populationMigrations.dropPopulationsTable();
  locationsMigrations.dropLocationsTable();
}



dropMigrations();