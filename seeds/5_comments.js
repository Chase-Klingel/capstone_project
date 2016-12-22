/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([{
        id: 1,
        video_id: 1,
        commenter: 'Ken',
        comment: 'I think my song would go great with this. Check it out. https://soundcloud.com/jacob-moldovan-1/unknown-shipwreck-vienna-ft',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        music_id: 2,
        commenter: 'Chase',
        comment: 'Hey this is a really great song. Thinking about using it for my next video. Feel free to check it out here. https://vimeo.com/195741470',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        video_id: 1,
        commenter: 'Ken',
        comment: 'Dude serioulsy, check my song out.',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 4,
        video_id: 1,
        commenter: 'Ken',
        comment: 'You there?',
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
