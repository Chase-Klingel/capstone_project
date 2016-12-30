/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('sc_users').del()
    .then(() => {
      return knex('sc_users').insert([{
        id: 1,
        sc_username: 'vide',
        email: 'vide@gmail.com',
        hashed_password: '$2a$12$LaKBUi8mCFc/9LiCtvwcvuNIjgaq9LJuy/NO.m4P5.3FP8zA6t2Va', // ambitionz
        photo_url: 'http://images2.mtv.com/uri/mgid:uma:video:mtv.com:1271725?width=657&height=370&crop=true&quality=0.85',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('sc_users_id_seq', (SELECT MAX(id) FROM sc_users));"
    );
    });
};
