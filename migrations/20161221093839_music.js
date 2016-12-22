'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('music', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('sc_users')
      .onDelete('CASCADE');
    table.string('src').notNullable().defaultTo('');
    table.string('name').notNullable().defaultTo('');
    table.string('mood').defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('music');
};
