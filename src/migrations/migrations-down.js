import 'dotenv/config';

import db from '../models';
import locationsMigrations from './locations';
import populationMigrations from './populations';





export const dropMigrations = () => {
  populationMigrations.dropPopulationsTable();
  locationsMigrations.dropLocationsTable();
  setTimeout(()=>{process.exit()}, 600);
}



dropMigrations();