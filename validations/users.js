'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .label('username')
      .required()
      .trim(),

    email: Joi.string()
      .label('email')
      .required()
      .trim(),

    password: Joi.string()
      .label('password')
      .required()
      .min(8)
      .trim()
  }
};
