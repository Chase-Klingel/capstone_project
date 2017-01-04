/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('music').del()
    .then(() => {
      return knex('music').insert([{
        id: 1,
        user_id: 1,
        song_id: '273691089',
        song_name: 'Charlotte Cardin - Dirty Dirty',
        artist_name: 'Cult Nation',
        mood: 'Love',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        user_id: 1,
        song_id: '267865577',
        song_name: 'Charlotte Cardin - Talk Talk',
        artist_name: 'Cult Nation',
        mood: 'Love',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        user_id: 1,
        song_id: '256213354',
        song_name: 'Charlotte Cardin - Like It Doesn\'t Hurt (feat. Husser)',
        artist_name: 'Cult Nation',
        mood: 'Love',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 4,
        user_id: 1,
        song_id: '212947031',
        song_name: 'Charlotte Cardin - Big Boy',
        artist_name: 'Cult Nation',
        mood: 'Love',
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
