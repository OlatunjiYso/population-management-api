import express from 'express';
import validations from '../validations/locations';
import controller from '../controllers/locations';
const locationHandler = express();

locationHandler.get(
  '/',
  controller.getAllLocations);

locationHandler.get(
  '/:locationId',
  validations.validateSpecifiedLocation,
  controller.getASpecifiedLocation);

locationHandler.post(
  '/',
  validations.addingLocation,
  controller.addNewLocation);

locationHandler.put(
  '/:locationId',
  validations.validateSpecifiedLocation,
  validations.updatingLocation,
  controller.updateLocation)

locationHandler.delete(
  '/:locationId',
  validations.validateSpecifiedLocation,
  controller.deleteLocation);


export default locationHandler;