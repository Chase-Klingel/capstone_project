/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([{
        id: 1,
        video_id: 1,
        commenter: 'vibe',
        commenter_photo_url: 'http://images2.mtv.com/uri/mgid:uma:video:mtv.com:1271725?width=657&height=370&crop=true&quality=0.85',
        comment: 'I think my song would go great with this. Check it out. https://soundcloud.com/jacob-moldovan-1/unknown-shipwreck-vienna-ft and here is a bunch of other text to see if this is the problem. I am not sure if it is the problem. bu we are going to find out if it is hte problem okay okay okay okay okay.',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        music_id: 2,
        commenter: 'Jack',
        commenter_photo_url: 'http://www.filmsbyj.com/wp-content/uploads/2014/09/Jarrett_camera_slider-e1414091846407.jpg',
        comment: 'Hey this is a really great song. Thinking about using it for my next video. Feel free to check it out here. https://vimeo.com/195741470  and here is a bunch of other text to see if this is the problem. I am not sure if it is the problem. bu we are going to find out if it is hte problem okay okay okay okay okay.',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        video_id: 1,
        commenter: 'vibe',
        commenter_photo_url: 'http://images2.mtv.com/uri/mgid:uma:video:mtv.com:1271725?width=657&height=370&crop=true&quality=0.85',
        comment: 'Dude serioulsy, check my song out.',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 4,
        video_id: 1,
        commenter: 'vibe',
        commenter_photo_url: 'http://images2.mtv.com/uri/mgid:uma:video:mtv.com:1271725?width=657&height=370&crop=true&quality=0.85',
        comment: 'You there?',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 5,
        music_id: 1,
        commenter: 'Jack',
        commenter_photo_url: 'http://www.filmsbyj.com/wp-content/uploads/2014/09/Jarrett_camera_slider-e1414091846407.jpg',
        comment: 'Hey dope song man.',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 6,
        music_id: 1,
        commenter: 'vibe',
        commenter_photo_url: 'http://images2.mtv.com/uri/mgid:uma:video:mtv.com:1271725?width=657&height=370&crop=true&quality=0.85',
        comment: 'Thanks man!',
        viewed: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 7,
        music_id: 4,
        commenter: 'vibe',
        commenter_photo_url: 'http://images2.mtv.com/uri/mgid:uma:video:mtv.com:1271725?width=657&height=370&crop=true&quality=0.85',
        comment: 'this is cool!',
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
