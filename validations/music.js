'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    songList: Joi.array()
      .label('songList')
      .required()
  }
};
