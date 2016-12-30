/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('music').del()
    .then(() => {
      return knex('music').insert([{
        id: 1,
        user_id: 1,
        song_id: '296373379',
        song_name: 'anomalous',
        artist_name: 'vide',
        mood: 'Carefree',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        user_id: 1,
        song_id: '299036816',
        song_name: 'henny and pineapple',
        artist_name: 'vide',
        mood: 'Carefree',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        user_id: 1,
        song_id: '289188744',
        song_name: 'push it w/ anoxex',
        artist_name: 'vide',
        mood: 'Carefree',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 4,
        user_id: 1,
        song_id: '289188744',
        song_name: 'push it w/ anoxex',
        artist_name: 'vide',
        mood: 'Eerie',
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
