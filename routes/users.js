/* eslint-disable max-len camelcase */
'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/users');

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

// used for getting a logged in vimeo users info
router.get('/api/vimeo/user', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('vimeo_users')
    .where('id', userId)
    .first()
    .then((user) => {
      if (!user) {
        throw boom.create(400, 'Can\'t find user');
      }

      const userData = camelizeKeys(user);
      delete userData.email;
      delete userData.hashedPassword;
      delete userData.vimeoId;
      delete userData.vimeoToken;

      res.send(userData);
    })
    .catch((err) => {
      next(err);
    });
});

// used for getting a logged in sc users info on initial signup
// just to get basic info.
router.get('/api/sc/user', authorize, (req, res, next) => {
  const { userId } = req.token;
  knex('sc_users')
    .where('id', userId)
    .first()
    .then((user) => {
      if (!user) {
        throw boom.create(400, 'Can\'t find user');
      }

      const userData = camelizeKeys(user);
      console.log(userData);
      delete userData.hashedPassword;
      delete userData.vimeoId;
      delete userData.vimeoToken;

      res.send(userData);
    })
    .catch((err) => {
      next(err);
    });
});

// get music content for specific user when another user goes to their profile
router.get('/api/music/:username', (req, res, next) => {
  let userName = req.params.username;
  // uppercase first letter to match db.
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  knex('sc_users')
    .innerJoin('music', 'music.user_id', 'sc_users.id')
    .where('sc_users.sc_username', userName)
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

// get video content for specific user when another user goes to their profile
router.get('/api/videos/:username', (req, res, next) => {
  let userName = req.params.username;
  // uppercase first letter to match db.
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  knex('vimeo_users')
    .innerJoin('videos', 'videos.user_id', 'vimeo_users.id')
    .where('vimeo_users.vimeo_username', userName)
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

router.post('/api/user', ev(validations.post), (req, res, next) => {
  const { username, email, password } = req.body;

  knex('sc_users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {

      const insertUser = { username, email, hashedPassword };

      return knex('sc_users')
        .insert(decamelizeKeys(insertUser), '*');
    })
    .then((row) => {
      res.send('success');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
