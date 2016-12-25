// eslint-disable-next-line new-cap
'use strict';

const express = require('express');
const app = express();
const knex = require('knex');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const compiler = webpack(config);

app.use(cookieParser());
// app.use(bodyParser());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('dist'));



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const vimeoAuth = require('./routes/vimeoAuth');
const users = require('./routes/users');
const token = require('./routes/token');
const videos = require('./routes/videos');
const music = require('./routes/music');
// const lessons = require('./routes/lessons');
// const wishList = require('./routes/wishList');
// const favorites = require('./routes/favorites');
// const oauth = require('./routes/oauth');

app.use('/auth', vimeoAuth);
app.use(users);
app.use(token);
app.use(videos);
app.use(music);
// app.use(lessons);
// app.use(wishList);
// app.use(favorites);
// app.use('/auth', oauth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.errors[0].messages[0]);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, err => {
  if (err) {
    return err;
  }

  console.log('Listening on port: ' + port);
});

module.exports = app;
