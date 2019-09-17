const persons = require('../persons');

exports.seed = function(knex, Promise) {
  return knex('person').del()
    .then(function () {
      return knex('person').insert(persons);
    });
};
