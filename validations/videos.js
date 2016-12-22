'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    videoList: Joi.array()
      .label('videoList')
      .required()
  }
};
