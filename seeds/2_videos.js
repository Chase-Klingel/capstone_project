/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('videos').del()
    .then(() => {
      return knex('videos').insert([{
        id: 1,
        user_id: 1,
        src: 'https://vimeo.com/195741470',
        needs_music: true,
        mood: 'happy',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        user_id: 1,
        src: 'https://vimeo.com/168422600',
        needs_music: false,
        mood: 'sad',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        user_id: 1,
        src: 'https://vimeo.com/166625600',
        needs_music: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('videos_id_seq', (SELECT MAX(id) FROM videos));"
    );
    });
};
