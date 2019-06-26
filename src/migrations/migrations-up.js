import 'dotenv/config';

import db from '../models';
import locationsMigrations from './locations';
import populationMigrations from './populations';


export const runMigrations = () => {
  locationsMigrations.createLocationsTable();
  populationMigrations.createPopulationsTable();
  setTimeout(()=>{process.exit()}, 600);
}


runMigrations();




