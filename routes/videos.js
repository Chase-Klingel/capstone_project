/* eslint-disable max-len camelcase */
'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/videos');

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


router.get('/api/all-videos', (req, res, next) => {
  knex('vimeo_users')
    .innerJoin('videos', 'videos.user_id', 'vimeo_users.id')
    .then((rows) => {
      const videos = camelizeKeys(rows);

      for (let i = 0; i < videos.length; i++) {
        delete videos[i].email;
        delete videos[i].hashedPassword;
        delete videos[i].vimeoId;
        delete videos[i].vimeoToken;
      }

      res.send(videos);
    })
    .catch((err) => {
      next(err);
    });
});

// to display a '+1' etc. notification for a specific user
// use this route and filter by userId
// otherwise this route is for displaying all videos with commments on the feed view
router.get('/api/videos-comments', (req, res, next) => {
  knex('videos')
    .innerJoin('comments', 'videos.id', 'comments.video_id')
    .innerJoin('vimeo_users', 'vimeo_users.id', 'videos.user_id')
    .orderBy('comments.created_at', 'asc') // make sure this goes oldest to newest
    .then((rows) => {
      const comments = camelizeKeys(rows);

      for (let i = 0; i < comments.length; i++) {
        delete comments[i].email;
        delete comments[i].hashedPassword;
        delete comments[i].vimeoId;
        delete comments[i].vimeoToken;
      }

      res.send(comments);
    })
    .catch((err) => {
      next(err);
    });
});

// post comments to a video
router.post('/api/videos-comments', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { videoId, commenter, commenterPhotoUrl, comment, viewed } = req.body;

  const insertComment = { videoId, commenter, commenterPhotoUrl, comment, viewed };

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
router.get('/api/videos', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('vimeo_users')
    .innerJoin('videos', 'vimeo_users.id', 'videos.user_id')
    // .innerJoin('comments', 'videos.id', 'comments.video_id')
    .where('vimeo_users.id', userId)
    .then((rows) => {

      const userVideos = camelizeKeys(rows);

      for (let i = 0; i < userVideos.length; i++) {
        delete userVideos[i].email;
        delete userVideos[i].vimeoId;
        delete userVideos[i].vimeoToken;
      }

      res.send(userVideos);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/user/videos/comments', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('vimeo_users')
    .innerJoin('videos', 'vimeo_users.id', 'videos.user_id')
    .innerJoin('comments', 'videos.id', 'comments.video_id')
    .where('vimeo_users.id', userId)
    .then((rows) => {

      const userVideos = camelizeKeys(rows);

      for (let i = 0; i < userVideos.length; i++) {
        delete userVideos[i].email;
        delete userVideos[i].vimeoId;
        delete userVideos[i].vimeoToken;
      }

      res.send(userVideos);
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/api/videos/edit', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('videos')
    .innerJoin('vimeo_users', 'vimeo_users.id', 'videos.user_id')
    .where('vimeo_users.id', userId)
    .then((rows) => {

      const userVideos = camelizeKeys(rows);

      for (let i = 0; i < userVideos.length; i++) {
        delete userVideos[i].email;
        delete userVideos[i].vimeoId;
        delete userVideos[i].vimeoToken;
      }

      res.send(userVideos);
    })
    .catch((err) => {
      next(err);
    });
});

// get video content for specific user when another user goes to their profile
router.get('/api/videos/:id', (req, res, next) => {
  const userId  = Number.parseInt(req.params.id);

  knex('vimeo_users')
    .innerJoin('videos', 'videos.user_id', 'vimeo_users.id')
    .where('vimeo_users.id', userId)
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

// post to '/api/videos' happens after axios get request for private videos & public videos
// goal is to simply store the 'src list associated with a user'
// later you will patch for 'needs_music' & mood
router.post('/api/videos/bulk', authorize, ev(validations.post), (req, res, next) => {
  const { userId } = req.token;
  const { videoList } = req.body; // will be an array of strings

  const insertVideoList = videoList.map((video) => {
    return { userId: userId, videoId: video.videoId, videoName: video.videoName, producerName: video.producerName, needsMusic: true, mood: video.mood };
  });

  knex('videos')
    .insert(decamelizeKeys(insertVideoList), '*')
    .then((rows) => {
      const insertedVideoList = camelizeKeys(rows[0]);

      res.send(insertedVideoList);
    })
    .catch((err) => {
      next(err);
    });
});

// this will be used for users clicking
  // 1. needsMusic --> yes or no
  // 2. mood --> select dropdown value
  // Note: you must send the video id associated with these actions
router.patch('/api/videos', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { videoId, needsMusic, mood } = req.body;

  knex('videos')
    .where('id', videoId)
    .first()
    .then((video) => {
      if (!video) {
        throw next(boom.create(404, 'Video not found'));
      }

      const updatedVideo = { needsMusic, mood };

      return knex('videos')
        .update(decamelizeKeys(updatedVideo), '*')
        .where('id', videoId);
      })
      .then((rows) => {
        const video = camelizeKeys(rows[0]);
        res.send(video);
      })
      .catch((err) => {
        next(err);
      });
});

module.exports = router;
