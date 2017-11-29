// Meant to happen during a migration
exports.up = function(knex, Promise) {
  console.log('Running PubSub migrations')
  return knex.schema.createTableIfNotExists('a_publishers', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').notNull();
  })
  .createTableIfNotExists('a_subscribers', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('pub_id').unsigned().references('id').inTable('a_publishers').notNull().onDelete('cascade');
    t.string('subscriber').notNull();
  });
};

// Meant to undo the migration
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('a_publishers')
                    .dropTable('a_subscribers');
};
