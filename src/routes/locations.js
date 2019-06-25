import express from 'express';

import controller from '../controllers/locations';
const locationHandler = express();

locationHandler.get('/', controller.getAllLocations);

locationHandler.get('/:locationId', controller.getASpecifiedLocation);

locationHandler.post('/', controller.addNewLocation);

locationHandler.put('/:locationId', controller.updateLocation)

locationHandler.delete('/:locationId', controller.deleteLocation);


export default locationHandler;