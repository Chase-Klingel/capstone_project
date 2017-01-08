/* eslint-disable max-len camelcase */
'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/music');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

router.get('/api/all-music', (req, res, next) => {
  knex('sc_users')
    .innerJoin('music', 'sc_users.id', 'music.user_id')
    .then((rows) => {
      const music = camelizeKeys(rows);

      for (let i = 0; i < music.length; i++) {
        delete music[i].email,
        delete music[i].hashedPassword
      }

      res.send(music);
    })
    .catch((err) => {
      next(err);
    });
});

// to display a '+1' etc. notification for a specific user
// use this route and filter by userId
// otherwise this route is for displaying all music with commments on the feed view
router.get('/api/music-comments', (req, res, next) => {
  knex('music')
    .innerJoin('comments', 'music.id', 'comments.music_id')
    .innerJoin('sc_users', 'sc_users.id', 'music.user_id')
    .orderBy('comments.created_at', 'asc') // make sure this goes oldest to newest
    .then((rows) => {
      const comments = camelizeKeys(rows);

      for (let i = 0; i < comments.length; i++) {
        delete comments[i].email;
        delete comments[i].hashedPassword;
      }

      res.send(comments);
    })
    .catch((err) => {
      next(err);
    });
});

// post comments to a song
router.post('/api/music-comments', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { musicId, commenter, commenterPhotoUrl, comment, viewed } = req.body;

  const insertComment = { musicId, commenter, commenterPhotoUrl, comment, viewed };

  knex('comments')
    .insert(decamelizeKeys(insertComment), '*')
    .then((row) => {
      const insertedComment = camelizeKeys(row[0]);

      res.send(insertedComment);
    })
    .catch((err) => {
      next(err);
    });
});

// when you go back to your profile after going through signup process this is the
// route you will 'get'.
router.get('/api/music', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('sc_users')
    .innerJoin('music', 'sc_users.id', 'music.user_id')
    // .innerJoin('comments', 'music.id', 'comments.music_id')
    .where('sc_users.id', userId)
    .then((rows) => {
      const userMusic = camelizeKeys(rows);

      for (let i = 0; i < userMusic.length; i++) {
        delete userMusic[i].email;
        delete userMusic[i].hashedPassword;
      }

      res.send(userMusic);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/user/music/comments', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('sc_users')
    .innerJoin('music', 'sc_users.id', 'music.user_id')
    .innerJoin('comments', 'music.id', 'comments.music_id')
    .where('sc_users.id', userId)
    .orderBy('comments.created_at', 'asc') // make sure this goes oldest to newest
    .then((rows) => {
      const comments = camelizeKeys(rows);

      res.send(comments);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/user/music/comments/:id', (req, res, next) => {
  const userId  = Number.parseInt(req.params.id);

  knex('sc_users')
    .innerJoin('music', 'sc_users.id', 'music.user_id')
    .innerJoin('comments', 'music.id', 'comments.music_id')
    .where('sc_users.id', userId)
    .orderBy('comments.created_at', 'asc') // make sure this goes oldest to newest
    .then((rows) => {
      const comments = camelizeKeys(rows);

      res.send(comments);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/music/edit', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('music')
    .innerJoin('sc_users', 'sc_users.id', 'music.user_id')
    .where('sc_users.id', userId)
    .then((rows) => {

      const userSongs = camelizeKeys(rows);

      for (let i = 0; i < userSongs.length; i++) {
        delete userSongs[i].email;
        delete userSongs[i].hashedPassword;
      }

      res.send(userSongs);
    })
    .catch((err) => {
      next(err);
    });
});

// get music content for specific user when another user goes to their profile
router.get('/api/music/:id', (req, res, next) => {
  const userId  = Number.parseInt(req.params.id);
  knex('sc_users')
    .innerJoin('music', 'music.user_id', 'sc_users.id')
    .where('sc_users.id', userId)
    .then((rows) => {
      const userData = camelizeKeys(rows);

      for (let i = 0; i < userData.length; i++) {
        delete userData[i].hashedPassword;
        delete userData[i].email;
      }

      res.send(userData);
    })
    .catch((err) => {
      next(err);
    });
});

// post to '/api/music' happens after axios get request for sc music
// goal is to simply store the 'src'
// later you will patch for 'mood'
router.post('/api/music/bulk', authorize, ev(validations.post), (req, res, next) => {
  const { userId } = req.token;
  const { songList } = req.body;

  const insertMusicList = songList.map((song) => {
    return { userId: userId, songId: song.songId, songName: song.songName, artistName: song.artistName, mood: song.mood };
  });

  knex('music')
    .insert(decamelizeKeys(insertMusicList), '*')
    .then((rows) => {

      const insertedMusicList = camelizeKeys(rows[0]);

      res.send(insertedMusicList);
    })
    .catch((err) => {
      next(err);
    });
});

// this will be used for users clicking
  // 1. needsMusic --> yes or no
  // 2. mood --> select dropdown value
  // Note: you must send the music id associated with these actions
router.patch('/api/music', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { musicId, mood } = req.body;

  knex('music')
    .where('id', musicId)
    .first()
    .then((music) => {
      if (!music) {
        throw next(boom.create(404, 'Music not found'));
      }

      const updatedMusic = { mood };

      return knex('music')
        .update(decamelizeKeys(updatedMusic), '*')
        .where('id', musicId);
      })
      .then((rows) => {
        const music = camelizeKeys(rows[0]);
        res.send(music);
      })
      .catch((err) => {
        next(err);
      });
});

module.exports = router;
