import db from '../models';
import { parse } from 'path';

const dbClient = db.client;

/**
 * @description - contains static methods for locations
 */
class LocationControllers {

  /**
   * @description - method to fetch all locations
   * @param {object} req - request object
   * @param {*} res - response object
   */
  static getAllLocations(req, res) {
    const sqlQuery = `SELECT * FROM (Locations 
    INNER JOIN Populations ON Locations.LocationID = Populations.LocationID);`
    // TODO: Should be able to set ordering from frontend.
    // TODO: Most populate, least populated, mostmale, mostfemale
    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
          .json({
            msg: 'internal server error',
            error: err.sqlMessage,
            more: 'error fetching all locations'
          })
      }
      return res.status(200)
        .json({
          msg: 'here are all locations',
          locations: result
        })
    });
  }

  static getASpecifiedLocation(req, res) {
    const { locationId } = req.params;

    const sqlQuery = `SELECT * FROM (Locations 
      INNER JOIN Populations ON Locations.LocationID = Populations.LocationID)
      WHERE Locations.LocationID = ${locationId};`
    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
          .json({
            msg: 'internal server error',
            error: err.sqlMessage
          });
      }
      if (result.length === 0) {
        return res.status(404)
          .json({
            msg: 'no such location exists 😒'
          })
      }
      return res.status(200)
        .json({
          msg: 'location found',
          location: result
        });
    });
  }


  static addNewLocation(req, res) {
    let { locationName, malePopulation, femalePopulation } = req.body;
    malePopulation = parseInt(malePopulation);
    femalePopulation = parseInt(femalePopulation);
    let totalPopulation = malePopulation + femalePopulation;

    // Now insert into table
    let sqlQuery = `INSERT INTO Locations 
      (Name) VALUE ('${locationName}');`
    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
          .json({
            msg: 'internal server error',
            error: err.sqlMessage,
            more: 'error encountered on locations table'
          })
      }
      let locationId = result.insertId
      let sqlQuery = `INSERT INTO Populations
        (LocationID, FemalePopulation, MalePopulation, TotalPopulation)
        VALUE (${locationId}, ${femalePopulation}, ${malePopulation}, ${totalPopulation});`

      dbClient.query(sqlQuery, (err, result) => {
        if (err) {
          return res.status(501)
            .json({
              msg: 'internal server error',
              error: err.sqlMessage,
              more: typeof malePopulation
            });
        }
        return res.status(201)
          .json({
            msg: 'location was successfully created',
            location: {
              id: locationId,
              name: locationName,
              malePopulation,
              femalePopulation,
              totalPopulation
            }
          });
      });
    });
  }


  static updateLocation(req, res) {
    const { locationId } = req.params;
    let { locationName, femalePopulation, malePopulation } = req.body;

    //check if location exists
    const sqlQuery = `SELECT * FROM (Locations 
      INNER JOIN Populations ON Locations.LocationID = Populations.LocationID)
      WHERE Locations.LocationID = ${locationId};`

    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
          .json({
            msg: 'internal server error',
            error: err.sqlMessage
          })
      }
      if (result.length === 0) {
        return res.status(404)
          .json({
            msg: 'no such location exists'
          })
      }

      //Now we are sure that location exists
      let newName = locationName || result[0].Name;
      let newFemalePopulation = femalePopulation || result[0].FemalePopulation;
      let newMalePopulation = malePopulation || result[0].MalePopulation;

      newFemalePopulation = parseInt(newFemalePopulation);
      newMalePopulation = parseInt(newMalePopulation);
      let newTotalPopulation = newFemalePopulation + newMalePopulation;

      let sqlQuery = `UPDATE Locations
         SET Locations.Name = '${newName}'
        WHERE Locations.LocationID = ${locationId};`
      dbClient.query(sqlQuery, (err, result) => {
        if (err) {
          return res.status(501)
            .json({
              msg: 'internal server error',
              error: err.sqlMessage
            })
        }
        let sqlQuery = `UPDATE Populations 
        SET MalePopulation = ${newMalePopulation}, FemalePopulation = ${newFemalePopulation},
        TotalPopulation = ${newTotalPopulation} WHERE Populations.LocationID = ${locationId};`;
        dbClient.query(sqlQuery, (err, result) => {
          if (err) {
            return res.status(501)
              .json({
                msg: 'internal server error',
                error: err.sqlMessage
              })
          }
          return res.status(200)
            .json({
              msg: 'population succesfully updated!',
              location: {
                newName,
                newFemalePopulation,
                newMalePopulation
              }
            });
        });
      });
    })
  }

  static deleteLocation(req, res) {
    const { locationId } = req.params;
    //check if location exists
    let sqlQuery = `SELECT * FROM Locations WHERE LocationID = ${locationId};`
    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
          .json({
            msg: 'internal server error',
            error: err.sqlMessage
          })
      }
      if (result.length === 0) {
        return res.status(404)
          .json({
            msg: 'no such location exists'
          })
      }
      //Now we are sure that location exixts
      let sqlQuery = `DELETE FROM Populations
       WHERE Populations.LocationID = ${locationId};`;
      dbClient.query(sqlQuery, (err, result) => {
        if (err) {
          return res.status(501)
            .json({
              msg: 'internal server error',
              error: err.sqlMessage
            })
        }
        let sqlQuery = `DELETE FROM Locations
         WHERE Locations.LocationID = ${locationId};`;
        dbClient.query(sqlQuery, (err, result) => {
          if (err) {
            return res.status(501)
              .json({
                msg: 'internal server error',
                error: err.sqlMessage
              })
          }
          return res.status(200)
            .json({
              msg: 'location deleted ☹️'
            })
        });
      });
    });
  }
}


export default LocationControllers;