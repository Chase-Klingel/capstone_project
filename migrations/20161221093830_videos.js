'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('videos', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('vimeo_users')
      .onDelete('CASCADE');
    table.string('video_id').notNullable().defaultTo('');
    table.string('video_name').notNullable().defaultTo('');
    table.string('producer_name').notNullable().defaultTo('');
    table.boolean('needs_music').notNullable().defaultTo(false);
    table.string('mood').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos');
};
