/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('videos').del()
    .then(() => {
      return knex('videos').insert([{
        id: 1,
        user_id: 1,
        video_id: '195741470',
        video_name: 'video name',
        producer_name: 'producer name',
        needs_music: true,
        mood: 'happy',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        user_id: 1,
        video_id: '168422600',
        video_name: 'video name',
        producer_name: 'producer name',
        needs_music: true,
        mood: 'sad',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        user_id: 1,
        video_id: '166625600',
        video_name: 'video name',
        needs_music: true,
        mood: 'glad',
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
