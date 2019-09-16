const knex = require('./knex'); // the connection

module.exports = {
    getAll() {
        return knex('location');
    },
    getOne(id) {
        return knex('location').where('location_id', parseInt(id)).first();
    },
    create(location) {
        return knex('location').insert(location, '*');  //room_name: notnull, room_number: nullable, place: nullable
    },
    update(id, location) {
        return knex('location').where('location_id', id).update(location, '*');
    },
    delete(id) {
        return knex('location').where('location_id', id).del();
    }

}