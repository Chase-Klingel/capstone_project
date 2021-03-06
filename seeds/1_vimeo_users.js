/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('vimeo_users').del()
    .then(() => {
      return knex('vimeo_users').insert([{
        id: 1,
        vimeo_username: 'Jack',
        email: 'jack@gmail.com',
        hashed_password: '$2a$12$LaKBUi8mCFc/9LiCtvwcvuNIjgaq9LJuy/NO.m4P5.3FP8zA6t2Va', // ambitionz
        photo_url: 'http://www.filmsbyj.com/wp-content/uploads/2014/09/Jarrett_camera_slider-e1414091846407.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('vimeo_users_id_seq', (SELECT MAX(id) FROM vimeo_users));"
    );
    });
};
