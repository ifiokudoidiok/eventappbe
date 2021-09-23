exports.up = function(knex) {
  return knex.schema.createTable('events', function(events) {
    events.increments();
    events.string('title').notNullable().unique();
    events.string('description').notNullable();
    events.string('start_date').notNullable();
    events.string('end_date').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events');
};
