const knex = require('./knex'); // the connection

module.exports = {
    getAll() {
        return knex('location');
    },
    getOne(id) {
        return knex('location')
            .where('location_id', id).first();
    },
    create(location) {
        return knex('location').insert(location, '*');
    }
}