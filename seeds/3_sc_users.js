/* eslint-disable camelcase, max-len */
'use strict';

exports.seed = function(knex) {
  return knex('sc_users').del()
    .then(() => {
      return knex('sc_users').insert([{
        id: 1,
        sc_username: 'cult-nation',
        email: 'charlotte@gmail.com',
        hashed_password: '$2a$12$LaKBUi8mCFc/9LiCtvwcvuNIjgaq9LJuy/NO.m4P5.3FP8zA6t2Va', // ambitionz
        photo_url: 'http://showbizz.net/wp-content/uploads/2016/07/charlottecardin_feq2016_5.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 2,
        sc_username     : 'sondarmusic',
        email           : 'sondar@gmail.com',
        hashed_password : '$2a$12$rPTmKO.XlamkACIrwYUW2uhuXTOA9sgVk9qnOZQoGWzfE171c9UuG',
        photo_url       : 'https://yt3.ggpht.com/-7tuYGRdAUag/AAAAAAAAAAI/AAAAAAAAAAA/Q6BRhsgw6dY/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
        bio             : 'We are Sondar.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 3,
        sc_username     : 'donnamissal',
        email           : 'donna@gmail.com',
        hashed_password : '$2a$12$a0EGBLD.JxbHDTihIIL.EOEmgcZ/gcLOlLphvf2Cxc7kharHvrVGi',
        photo_url       : 'http://images.travelpod.com/tw_slides/ta00/9ea/324/through-the-rolling-hils-of-south-africa-n1-hoedspruit.jpg',
        bio             : 'I am Donna.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 4,
        sc_username     : 'juniorempiremusic',
        email           : 'juniorempire@gmail.com',
        hashed_password : '$2a$12$A1ZVUgrbHx07sd35JA6KueAVAsnxJhTLWnMeK6oeCLA.aCA/taOty',
        photo_url       : 'https://pbs.twimg.com/media/Ckd9paOUoAA15Wr.jpg',
        bio             : 'We are Junior Empire.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 5,
        sc_username     : 'jamescrooksmusic',
        email           : 'james@gmail.com',
        hashed_password : '$2a$12$6qNc1rvd/rApMEm3adA3bOcIWpSjKNIc/1UpmbiJllgJ4cBbHVv6y',
        photo_url       : 'https://www.triplejunearthed.com/sites/default/files/artists/public/4/5/2/7/8/9/6//e616e7f5-65cd-44f4-9c8e-fa9aeb17c018.JPG',
        bio             : 'I am James.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 6,
        sc_username     : 'inspired-and-the-sleep',
        email           : 'inspired@gmail.com',
        hashed_password : '$2a$12$wbVbnX6X6Zi1Tq.ET3e7QOey0mT8PAWabgDLzHh3KGjDEOZCkDq22',
        photo_url       : 'https://i1.sndcdn.com/avatars-000148591750-w2gejm-t500x500.jpg',
        bio             : 'We are Inpsired and the Sleep.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 7,
        sc_username     : 'wallflowermusic',
        email           : 'wallflower@gmail.com',
        hashed_password : '$2a$12$4IwhG8Y/sXciRcJMkG2nKOc5b2wtFoYlMKUJwwU.TooRhhiFmnoqq',
        photo_url       : 'https://images.genius.com/42f83bbd5a3d5d1c1edc1bb1e4ebe10a.990x1000x1.jpg',
        bio             : 'We are Wallflower.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 8,
        sc_username     : 'danielfeels',
        email           : 'dan@gmail.com',
        hashed_password : '$2a$12$eHG1PnN/XEjDT0KJXTG5yeZHNkhDCkDoi4UvWS7Yq98SQsye.yxBG',
        photo_url       : 'https://pbs.twimg.com/profile_images/646765566196350977/2fv1bxTz.jpg',
        bio             : 'I like playing with sounds.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 9,
        sc_username     : 'camel-power-club',
        email           : 'camel@gmail.com',
        hashed_password : '$2a$12$2QNLHJUV/Q1P0IOD7uVR8Ov50btwpiaGst7vwSTtlfANNulNfEIQ6',
        photo_url       : 'https://www.aviary.com/img/photo-landscape.jpg',
        bio             : 'Camel power.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 10,
        sc_username     : 'danielwilson',
        email           : 'danwilson@gmail.com',
        hashed_password : '$2a$12$FTcAl3p5Q4p0l.957p8eF.CFLbIE8Ja5ZzhlhV/2VNfzdxJxywz86',
        photo_url       : 'http://music.allaccess.com/wp-content/uploads/2015/01/danielwilson6.jpg',
        bio             : 'I am Daniel Wilson.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 11,
        sc_username     : 'vicente-p-1',
        email           : 'millionyoung@gmail.com',
        hashed_password : '$2a$12$cmyBH4khjW7ixhwgEvW0dOMfqD0Ef2Clyszv85TkByvGjUVIPqPd.',
        photo_url       : 'http://www.bmi.com/images/news/2010/cache/million_young-600x340.jpg',
        bio             : 'I am million young.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 12,
        sc_username     : 'tepno',
        email           : 'tepno@gmail.com',
        hashed_password : '$2a$12$cBap3/YOcre3tZ34L02QR.muFtE.Jd5lJtEiTQaw4DWKsYbNmuxxO',
        photo_url       : 'https://i1.sndcdn.com/artworks-000125446629-qmobz6-t500x500.jpg',
        bio             : 'I am Tep No.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 13,
        sc_username     : 'majidjordan',
        email           : 'maj@gmail.com',
        hashed_password : '$2a$12$kNIiokyWw7Ymx4v0lqFhLehlvJmDxrHi5E4CyS2ve/fuNRGTMK8WG',
        photo_url       : 'https://fsmedia.imgix.net/e0/42/6a/2f/edc0/413a/a0dd/a0d8e67aa88e/what-to-expect-from-majid-jordans-debut-album-majid-jordan.jpeg',
        bio             : 'I am Majid.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 14,
        sc_username     : 'stwosc',
        email           : 'stwo@gmail.com',
        hashed_password : '$2a$12$8rot5zyl9TCVV9qLXVZQzuhYqJMkwXDevE3q8xPPV1qBbU/vy/md6',
        photo_url       : 'http://sweaty320.com/wp-content/uploads/2015/04/stwo.jpeg',
        bio             : 'I am Stwo.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 15,
        sc_username     : 'tommisch',
        email           : 'tom@gmail.com',
        hashed_password : '$2a$12$brYSGiDGApCn/NkdhfRPf.2ZaYjL0vrQbSjTOReHadCN4Li5UtTue',
        photo_url       : 'https://ichef.bbci.co.uk/images/ic/976x549/p030w3d8.jpg',
        bio             : 'I am Tom.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 16,
        sc_username     : 'siyyu',
        email           : 'siy@gmail.com',
        hashed_password : '$2a$12$N/I4yjBIi1MsLy1ObRUW6unK0JCY/lr0dhs1FexF7hiUMakMOKX0O',
        photo_url       : 'http://www.newhitsingles.com/wp-content/uploads/2016/07/SIYYU-Stop-us-Radio-Edit-Dancing-Astronaut-646x429.png',
        bio             : 'I am Siyyu.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 17,
        sc_username     : 'von-sell',
        email           : 'von@gmail.com',
        hashed_password : '$2a$12$qiO7u1CoQ9u4682vgSJk0e9BT3dwVESKxyA5ugQpEvnlO55CJRlp2',
        photo_url       : 'http://www.backseatmafia.com/wp-content/uploads/2016/10/von-sell.jpg',
        bio             : 'I am Von Sell.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 18,
        sc_username     : '2hils',
        email           : '2hils@gmail.com',
        hashed_password : '$2a$12$ZFtr0ZmiaGiiW/zRQLsRluMBhxgH7hlmUMinArsWh9IxNHDAWQWQG',
        photo_url       : 'http://images.travelpod.com/tw_slides/ta00/9ea/324/through-the-rolling-hils-of-south-africa-n1-hoedspruit.jpg',
        bio             : 'I am hils.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 19,
        sc_username     : 'garrenmusic',
        email           : 'garren@gmail.com',
        hashed_password : '$2a$12$X/hpujA9sbcIh4yGVzOlaueCto3/XLg/FUI2d.UIegJSP6dKV9aZC',
        photo_url       : 'http://images.8tracks.com/cover/i/009/089/647/tumblr_n8ux2hWuaR1s4vaseo1_500-868.png?rect=15,0,469,469&q=98&fm=jpg&fit=max',
        bio             : 'I am Garren.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 20,
        sc_username     : 'reibrown',
        email           : 'rei@gmail.com',
        hashed_password : '$2a$12$kZQuHQLUK1dZi2WNjOvntOhnBSGlYllB2CM7tZbxO3pvIBkbKnFEu',
        photo_url       : 'https://i.ytimg.com/vi/xVu6KpNI7Sg/maxresdefault.jpg',
        bio             : 'I am Rei.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 21,
        sc_username     : 'kngdavdmusic',
        email           : 'kng@gmail.com',
        hashed_password : '$2a$12$8OFU1ZkmbwRmZKNCPojaA.gIBE0B.oVGrhDTpurb.Up2OozxtshNi',
        photo_url       : 'http://poponandon.com/wp-content/uploads/2016/09/kngdavd-poppies-2016.jpg',
        bio             : 'I am KNGDAVD.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 22,
        sc_username     : 'axelflovent',
        email           : 'axel@gmail.com',
        hashed_password : '$2a$12$U5s0i0kXyn0LodhAG/U1Be3ft4suWoeHi/jCQD.ImmdnhdRb0b4z.',
        photo_url       : 'http://d14wch1fpzoq5q.cloudfront.net/2015/08/Axel-Flovent-reduced.jpg',
        bio             : 'I am Axel Flovent.',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id              : 23,
        sc_username     : 'jordanmackampa',
        email           : 'jordan@gmail.com',
        hashed_password : '$2a$12$MMts7kXHqP4OHWecCmOrmOnmD1cwuzxSwBEtpkkAXbd3VFS1KJwHK',
        photo_url       : 'http://next2shine.com/wp-content/uploads/jordanmackampa.jpg',
        bio             : 'I am Jordan.',
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
