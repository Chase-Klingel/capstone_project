'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/av_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/av_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
