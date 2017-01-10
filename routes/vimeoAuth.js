'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const VimeoStrategy = require('passport-vimeo-oauth2').Strategy;
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request-promise');

// 569ad12e8e8e449efc81197d46f557bd

const router = express.Router();

passport.use(new VimeoStrategy({
  clientID: process.env.VIMEO_CLIENT_ID,
  clientSecret: process.env.VIMEO_CLIENT_SECRET,
  scope: ['private', 'public', 'email']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, { profile, accessToken, refreshToken });
}));

router.get('/vimeo', passport.authenticate('vimeo', { session: false }));

router.get('/vimeo/callback', passport.authenticate('vimeo', { session: false, failureRedirect: '/'}), (req, res, next) => {
  const user = req.user;
  const vimeoUsername = user.profile.username;
  // const photoUrl = user.profile._json.pictures[3].link;
  const email = user.profile._json.email;
  const vimeoId = user.profile.id;
  const vimeoToken = user.accessToken;
  let setupProfile = true;

  return knex('vimeo_users')
    .where('vimeo_id', vimeoId)
    .first()
    .then((user) => {
      if (user) {
        // must make user an array b/c the newUser returned on line 53 is an array.
        user = [user];
        setupProfile = false;
        return user;
      }

      const newUser = {
        vimeoUsername,
        email,
        // photoUrl,
        vimeoId,
        vimeoToken
      }

      return knex('vimeo_users').insert(decamelizeKeys(newUser), '*');
    })
    .then((user) => {
      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);
      const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '3h' });

      res.cookie('token', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production',
      });

      if (setupProfile) {
        res.redirect('/signup/vimeo');
      } else {
        res.redirect('/signin/vimeo');
      }

    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
