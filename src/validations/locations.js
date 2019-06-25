
/**
 * @description - contains static methods to validate user inputs
 */
class LocationValidations {

/**
 * @description - validates locationId
 * @param {object} req - request object
 * @param {object} res - response object
 */
static validateSpecifiedLocation(req, res, next) {
  const { locationId } = req.params;
  let errors = [];
  if(!locationId || isNaN(locationId) || (locationId < 1) ) {
    errors.push('please enter a valid locationId')
  }
  if(errors.length > 0) {
    return res.status(400)
      .json({
        msg: 'encountered some errors',
        errors
      })
  }
  next();
}

/**
 * @description - validates location information
 * @param {object} req - request object
 * @param {object} res - response object
 */
static addingLocation(req, res, next) {
  let { locationName, malePopulation, femalePopulation } = req.body;
  let errors = [];
  if(!locationName || (locationName.trim().length === 0) || !(isNaN(locationName))) {
    errors.push('enter a valid location name');
  }
  if(!malePopulation || isNaN(malePopulation) || (malePopulation < 0) ) {
    errors.push('enter a valid malePopulation');
  }
  if (!femalePopulation || isNaN(femalePopulation) || (femalePopulation < 0) ) {
    errors.push('Invalid female population')
  }
  if(errors.length > 0) {
    return res.status(400)
      .json({
        msg: 'encountered some errors',
        errors
      })
  }
  next();
}

/**
 * @description - validates location information
 * @param {object} req - request object
 * @param {object} res - response object
 */
static updatingLocation(req, res, next) {
  let { locationName, malePopulation, femalePopulation } = req.body;
  let errors = [];
  if(locationName && ((locationName.trim().length === 0) || !(isNaN(locationName)))) {
    errors.push('enter a valid location name');
  }
  if(malePopulation && (isNaN(malePopulation) || (malePopulation < 0))) {
    errors.push('enter a valid malePopulation');
  }
  if (femalePopulation && (isNaN(femalePopulation) || (femalePopulation < 0))) {
    errors.push('Invalid female population')
  }
  if(errors.length > 0) {
    return res.status(400)
      .json({
        msg: 'encountered some errors',
        errors
      })
  }
  next();
}
}


export default LocationValidations;