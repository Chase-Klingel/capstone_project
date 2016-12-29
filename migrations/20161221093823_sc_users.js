'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('sc_users', (table) => {
    table.increments();
    table.string('sc_username').notNullable().unique().defaultTo('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)');
    table.string('photo_url', 500).defaultTo('');
    table.text('bio').defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sc_users');
};
