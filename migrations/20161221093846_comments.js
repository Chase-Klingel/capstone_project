'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments();
    table.integer('video_id')
      .references('id')
      .inTable('videos')
      .onDelete('CASCADE');
    table.integer('music_id')
      .references('id')
      .inTable('music')
      .onDelete('CASCADE');
    table.string('commenter').notNullable().defaultTo('');
    table.string('comment').notNullable().defaultTo('');
    table.boolean('viewed').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
