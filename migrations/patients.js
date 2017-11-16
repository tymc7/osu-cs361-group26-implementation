// Meant to happen during a migration
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('a_patients', (t) => {
    t.increments('id').unsigned().primary();
    t.timestamps(true, true)
    t.string('first_name').notNull();
    t.string('middle_name');
    t.string('last_name').notNull();
    t.string('address').nullable();
    t.string('city').nullable();
    t.string('state').nullable();
    t.string('zipcode').nullable();
    t.string('phone_number').nullable();
    t.integer('ssn').notNull();
    t.text('symptoms').nullable();
  });
};

// Meant to undo the migration
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('a_patients');
};
