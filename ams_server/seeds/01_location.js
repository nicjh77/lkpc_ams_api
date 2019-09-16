const locations = require('../locations');

exports.seed = function(knex, Promise) {
  return knex('location').del()
    .then(function () {
      return knex('location').insert(locations);
    });
};
