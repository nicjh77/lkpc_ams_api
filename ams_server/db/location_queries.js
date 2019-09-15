const knex = require('./knex'); // the connection

module.exports = {
    getAll() {
        return knex('location');
    },
    getOne() {
        return knex('location')
            .where({location_id: 1});
    }
}