
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('location', t => {
            t.integer('location_id').unsigned().primary();
            t.integer('room_number').unsigned().nullable();
            t.string('room_name').notNull();
            t.string('place').nullable();
        })
        .createTable('person', t => {
            t.integer('person_id').unsigned().primary();
            t.string('person_name').notNull();
            t.string('person_contact').nullable();
        })
        .createTable('item', t => {
            t.bigInteger('icode').unsigned().primary();
            t.string('image_path').notNull();
            t.string('name').notNull();
            t.string('color').notNull();
            t.dateTime('register_date').notNull();
            t.text('description').nullable();
            t.integer('location_id').unsigned().notNull();
            t.foreign('location_id').references('location_id').inTable('location');
            t.integer('person_id').unsigned().notNull();
            t.foreign('person_id').references('person_id').inTable('person');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('item')
        .dropTable('location')
        .dropTable('person')
};
