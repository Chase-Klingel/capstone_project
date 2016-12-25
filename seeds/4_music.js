/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('music').del()
    .then(() => {
      return knex('music').insert([{
        id: 1,
        user_id: 1,
        song_id: 5870,
        song_name: 'could be us',
        artist_name: 'iamellusive',
        mood: 'chill',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        user_id: 1,
        song_id: 5980,
        song_name: 'panda',
        artist_name: 'gucci_vibes',
        mood: 'ambient',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('music_id_seq', (SELECT MAX(id) FROM music));"
    );
    });
};
