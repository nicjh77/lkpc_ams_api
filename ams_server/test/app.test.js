const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app');

const fixtures = require('./fixtures');


describe('CRUD Locations', () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run();
            }).then(() => done());
    });

    it('Lists all Records', (done) => {
        request(app)
            .get('/api/locations')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.locations).to.be.a('array');
                expect(response.body.locations).to.deep.equal(fixtures.locations) 
                done();  
            });
    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/locations/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.location).to.be.a('object');
                expect(response.body.location).to.deep.equal(fixtures.locations[0]) 
                done();  
            });
    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/locations/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.location).to.be.a('object');
                expect(response.body.location).to.deep.equal(fixtures.locations[2]) 
                done();  
            });
    });

    it('Creates a record', (done) => {
        request(app)
            .post('/api/locations')
            .send(fixtures.location)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.location).to.be.a('object');
                fixtures.location.location_id = response.body.location.location_id;
                expect(response.body.location).to.deep.equal(fixtures.location);
                done();
            });
    });

    it('Updates a record', (done) => {
        fixtures.location.room_number = 215;
        request(app)
            .put('/api/locations/5')
            .send(fixtures.location)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.location).to.be.a('object');
                expect(response.body.location).to.deep.equal(fixtures.location);
                done();
            });
    });

    it('Deletes a record', (done) => {  // need to update
        request(app)
            .delete('/api/locations/5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({
                    success: true
                });
                done();
            });
    });
});