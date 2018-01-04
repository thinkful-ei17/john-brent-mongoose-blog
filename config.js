'use strict';

const DATABASE_URL = process.env.DATABASE_URL
  || global.DATABASE_URL
  || 'postgresql://localhost/blog-app';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  debug: true               // Outputs knex debugging information
};

exports.PORT = process.env.PORT || 8080; 