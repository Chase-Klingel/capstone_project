'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('vimeo_users', (table) => {
    table.increments();
    table.string('vimeo_username').notNullable().unique().defaultTo('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)');
    table.string('photo_url').defaultTo('');
    table.text('bio').defaultTo('');
    table.integer('vimeo_id').unique();
    table.string('vimeo_token');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vimeo_users');
};
