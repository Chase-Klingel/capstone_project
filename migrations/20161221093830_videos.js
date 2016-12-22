'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('videos', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('vimeo_users')
      .onDelete('CASCADE');
    table.string('src').notNullable().defaultTo('');
    table.string('name').notNullable().defaultTo('');
    table.boolean('needs_music').notNullable().defaultTo(false);
    table.string('mood');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos');
};
