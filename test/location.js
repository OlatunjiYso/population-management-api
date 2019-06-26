import request from 'supertest';
import should from 'should';

import app from '../src/index.js';;
import { runMigrations } from '../src/migrations/migrations-up';
import { dropMigrations } from '../src/migrations/migrations-down';


describe('all tests for locations', () => {
  before(function () {
    dropMigrations();
    runMigrations();
  });


  describe('Tests for adding a new location', () => {
    it('should validate against null inputs', (done) => {
      request(app)
        .post('/api/v1/locations/')
        .send({ malePopulation: null, locationName: null, femalePopulation: null })
        .end(function (err, res) {
          res.body.msg.should.equal('encountered some errors');
          res.body.errors[0].should.equal('enter a valid location name');
          res.body.errors[1].should.equal('enter a valid malePopulation');
          res.body.errors[2].should.equal('Invalid female population');
          res.status.should.equal(400);
          done();
        });
    });
    it('should validate against invalid inputs', (done) => {
      request(app)
        .post('/api/v1/locations/')
        .send({ malePopulation: -9, locationName: '', femalePopulation: -4 })
        .end(function (err, res) {
          res.body.msg.should.equal('encountered some errors');
          res.body.errors[0].should.equal('enter a valid location name');
          res.body.errors[1].should.equal('enter a valid malePopulation');
          res.body.errors[2].should.equal('Invalid female population');
          res.status.should.equal(400);
          done();
        });
    });
    it('should add location with valid parameters', (done) => {
      request(app)
        .post('/api/v1/locations/')
        .send({ malePopulation: 50, locationName: 'testing', femalePopulation: 55 })
        .end(function (err, res) {
          res.body.msg.should.equal('location was successfully created');
          res.status.should.equal(201);
          done();
        });
    });
  })

  describe('Tests for getting a specified location', () => {
    it('should validate against non integer locationId', (done) => {
      request(app)
        .get('/api/v1/locations/gtr5t')
        .end(function (err, res) {
          res.status.should.equal(400);
          res.body.msg.should.equal('encountered some errors');
          res.body.errors[0].should.equal('please enter a valid locationId');
          done();
        });
    });
    it('should validate negative integer locationId', (done) => {
      request(app)
        .get('/api/v1/locations/-8')
        .end(function (err, res) {
          res.body.msg.should.equal('encountered some errors');
          res.status.should.equal(400);
          done();
        });
    });
    it('should allow a valid locationId', (done) => {
      request(app)
        .get('/api/v1/locations/1')
        .end(function (err, res) {
          res.body.msg.should.equal('location found');
          res.status.should.equal(200);
          done();
        });
    });
    it('should handle unavailable locations', (done) => {
      request(app)
        .get('/api/v1/locations/13456776')
        .end(function (err, res) {
          res.body.msg.should.equal('no such location exists 😒');
          res.status.should.equal(404);
          done();
        });
    });
  });

  describe('Test for fetching all locations', () => {
    it('should fetch all locations', (done) => {
      request(app)
        .get('/api/v1/locations')
        .end(function (err, res) {
          res.body.msg.should.equal('here are all locations');
          res.status.should.equal(200);
          done();
        });
    })
  });

  describe('Tests for updating a location', () => {
    it('should not update non-existing locations', (done) => {
      request(app)
        .put('/api/v1/locations/9876565')
        .end(function (err, res) {
          res.body.msg.should.equal('no such location exists');
          res.status.should.equal(404);
          done();
        });
    });
    it('should validate user inputs for updates', (done) => {
      request(app)
        .put('/api/v1/locations/12')
        .send({ locationName: '   ', malePopulation: 'g', femalePopulation: 'u' })
        .end(function (err, res) {
          res.body.msg.should.equal('encountered some errors');
          res.body.errors[0].should.equal('enter a valid location name');
          res.body.errors[1].should.equal('enter a valid malePopulation');
          res.body.errors[2].should.equal('Invalid female population');
          res.status.should.equal(400);
          done();
        });
    });
    it('should update existing locations', (done) => {
      request(app)
        .put('/api/v1/locations/1')
        .send({ malePopulation: 6000 })
        .end(function (err, res) {
          res.body.msg.should.equal('population succesfully updated!');
          res.body.location.newMalePopulation.should.equal(6000);
          res.status.should.equal(200);
          done();
        });
    });
  })


  describe('Tests for deleting locations', () => {
    it('should validate againts non-existing location', (done) => {
      request(app)
        .delete('/api/v1/locations/137654')
        .end(function (err, res) {
          res.body.msg.should.equal('no such location exists');
          res.status.should.equal(404);
          done();
        });
    });
    it('should delete a specified location', (done) => {
      request(app)
        .delete('/api/v1/locations/1')
        .end(function (err, res) {
          res.body.msg.should.equal('location deleted ☹️');
          res.status.should.equal(200);
          done();
        });
    })
  })
})


