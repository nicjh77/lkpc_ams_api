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
});