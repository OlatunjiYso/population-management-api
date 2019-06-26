[![Build Status](https://travis-ci.org/OlatunjiYso/population-management-api.svg?branch=develop)](https://travis-ci.org/OlatunjiYso/population-management-api)
<a href="https://codeclimate.com/github/OlatunjiYso/population-management-api/maintainability"><img src="https://api.codeclimate.com/v1/badges/2e0ba303c89b989631ee/maintainability" /></a>



## population-management-api
A Node Express API design for a population management system

### Features
- Fetching a location's population distribution
- Fetching all locations population distribution
- Adding a new location and it population
- Updating an existing location
- Deleting a specified location.




### Available endpoints


|        ENDPOINT / PATH         |    HTTP VERB      |             Purpose                |         Req Body
|--------------------------------|:-----------------:|:----------------------------------:|:--------------------------------
|  api/v1/locations/locationId   |     GET           | fetches a specified location .     |       
|  api/v1/locations/             |     GET           | Fetches all locations.             | 
|  api/v1/locations/             |     POST          | Adds a new location                | name, mpopulation, fPopulation
|  api/v1/locations/locationId   |     PUT           | Updates an existing location       |
|  api/v1/locations/locationId   |     DELETE        | deletes a specified location       |






### Setting up 
- clone the project
- on the root directory, run `npm install`
- setup your local MYSQL database
- run migration script with `npm runMigrate`
- start the app with `npm start`





### Technology Stack
- Node 
- Express
- MySQL
