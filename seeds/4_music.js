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
      }, {
        id: 5,
        user_id     : 2,
        song_id     : '279818860',
        song_name   : 'Ready',
        artist_name : 'SONDAR',
        mood        : 'Carefree',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 6,
        user_id     : 2,
        song_id     : '237742662',
        song_name   : 'Singlewave',
        artist_name : 'SONDAR',
        mood        : 'Carefree',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 7,
        user_id     : 4,
        song_id     : '286294896',
        song_name   : 'Danger',
        artist_name : 'Junior Empire',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 8,
        user_id     : 4,
        song_id     : '277793358',
        song_name   : 'Decide',
        artist_name : 'Junior Empire',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 9,
        user_id     : 4,
        song_id     : '268112601',
        song_name   : 'West Coast',
        artist_name : 'Junior Empire',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 10,
        user_id     : 6,
        song_id     : '35375734',
        song_name   : 'What I Want and What I Need',
        artist_name : 'Inspired & the Sleep',
        mood        : 'Beach Vibes',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 11,
        user_id     : 7,
        song_id     : '297981498',
        song_name   : 'Set Me Off',
        artist_name : 'Wallflower',
        mood        : 'Carefree',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 12,
        user_id     : 7,
        song_id     : '289678678',
        song_name   : 'banks - better (flip) *free download*',
        artist_name : 'Wallflower',
        mood        : 'Passion',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 13,
        user_id     : 7,
        song_id     : '238753304',
        song_name   : 'Mistakes Like This',
        artist_name : 'Wallflower',
        mood        : 'Carefree',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 14,
        user_id     : 8,
        song_id     : '272365039',
        song_name   : 'Eyes Closed (feat. Casso)',
        artist_name : 'Daniel Feels',
        mood        : 'Passion',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 15,
        user_id     : 8,
        song_id     : '269377489',
        song_name   : 'Parachute',
        artist_name : 'Daniel Feels',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 16,
        user_id     : 8,
        song_id     : '168998699',
        song_name   : 'Lashing Out',
        artist_name : 'Daniel Feels',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 17,
        user_id     : 11,
        song_id     : '8712424',
        song_name   : 'MillionYoung - Mien',
        artist_name : 'Vicente P',
        mood        : 'Beach Vibes',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 18,
        user_id     : 11,
        song_id     : '8711078',
        song_name   : 'MillionYoung - Hammock',
        artist_name : 'Vicente P',
        mood        : 'Beach Vibes',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 19,
        user_id     : 12,
        song_id     : '226139958',
        song_name   : 'Swear Like a Sailor',
        artist_name : 'Tep No',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 20,
        user_id     : 12,
        song_id     : '208221122',
        song_name   : 'Pacing',
        artist_name : 'Tep No',
        mood        : 'Beach Vibes',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 21,
        user_id     : 13,
        song_id     : '213974460',
        song_name   : '[:]',
        artist_name : 'Majid Jordan',
        mood        : 'Passion',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 22,
        user_id     : 13,
        song_id     : '172712338',
        song_name   : 'U',
        artist_name : 'Majid Jordan',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 23,
        user_id     : 13,
        song_id     : '157694586',
        song_name   : 'A Place Like This',
        artist_name : 'Majid Jordan',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 24,
        user_id     : 15,
        song_id     : '156812928',
        song_name   : 'Memory',
        artist_name : 'Tom Misch',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 25,
        user_id     : 15,
        song_id     : '154792767',
        song_name   : 'Moving Faster',
        artist_name : 'Tom Misch',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 26,
        user_id     : 15,
        song_id     : '133390916',
        song_name   : 'Lush Life',
        artist_name : 'Tom Misch',
        mood        : 'Contemplative',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 27,
        user_id     : 5,
        song_id     : '228295727',
        song_name   : 'Naturally (feat. Paige IV)',
        artist_name : 'James Crooks',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 28,
        user_id     : 10,
        song_id     : '294737437',
        song_name   : 'Boy Who Cried Thunder',
        artist_name : 'Daniel Wilson',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 29,
        user_id     : 10,
        song_id     : '294737229',
        song_name   : 'Young Rubbish',
        artist_name : 'Daniel Wilson',
        mood        : 'Carefree',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 30,
        user_id     : 10,
        song_id     : '294737194',
        song_name   : 'Please Dream Again',
        artist_name : 'Daniel Wilson',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 31,
        user_id     : 14,
        song_id     : '291492196',
        song_name   : 'Flume - Say It feat. Tove Lo (Stwo Remix)',
        artist_name : 'stwo',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 32,
        user_id     : 16,
        song_id     : '294409993',
        song_name   : 'SIYYU - Stop Us (Mike Wooller Remix)',
        artist_name : 'SIYYU',
        mood        : 'Carefree',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 33,
        user_id     : 17,
        song_id     : '276278923',
        song_name   : 'Stay',
        artist_name : 'Von Sell',
        mood        : 'Beach Vibes',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 34,
        user_id     : 9,
        song_id     : '295850766',
        song_name   : 'Sankara',
        artist_name : 'Camel Power Club ☄',
        mood        : 'Passion',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 35,
        user_id     : 19,
        song_id     : '295186711',
        song_name   : 'There She Go',
        artist_name : 'GARREN',
        mood        : 'Contemplative',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 36,
        user_id     : 20,
        song_id     : '293659257',
        song_name   : 'wouldnt it be great',
        artist_name : 'rei brown',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 37,
        user_id     : 18,
        song_id     : '300486345',
        song_name   : 'FUNKY TECH TRIBE',
        artist_name : 'HILS',
        mood        : 'Beach Vibes',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 38,
        user_id     : 21,
        song_id     : '283886008',
        song_name   : 'POPPIES',
        artist_name : 'KNGDAVD',
        mood        : 'Passion',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 39,
        user_id     : 22,
        song_id     : '299879164',
        song_name   : 'Your Ghost',
        artist_name : 'Axel Flóvent',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 40,
        user_id     : 22,
        song_id     : '295876954',
        song_name   : 'Silently',
        artist_name : 'Axel Flóvent',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 41,
        user_id     : 22,
        song_id     : '181461664',
        song_name   : 'Swim Good',
        artist_name : 'Axel Flóvent',
        mood        : 'Sad',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 42,
        user_id     : 23,
        song_id     : '284882894',
        song_name   : 'Same Faces',
        artist_name : 'Jordan Mackampa',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }, {
        id          : 43,
        user_id     : 23,
        song_id     : '282522139',
        song_name   : 'Midnight',
        artist_name : 'Jordan Mackampa',
        mood        : 'Love',
        created_at  : new Date('2016-06-29 14:26:16 UTC'),
        updated_at  : new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('music_id_seq', (SELECT MAX(id) FROM music));"
    );
    });
};
