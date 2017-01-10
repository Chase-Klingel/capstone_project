/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([{
        id: 1,
        video_id: 1,
        commenter: 'kngdavdmusic',
        commenter_photo_url: 'http://poponandon.com/wp-content/uploads/2016/09/kngdavd-poppies-2016.jpg',
        comment: 'What a cool video!',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
    );
    });
};
