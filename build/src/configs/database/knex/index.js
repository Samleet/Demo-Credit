/**
 * Database Connection using KnexJS
 */
import knex from 'knex';
import config from './config.js';
const env = process.env.DB_ENV || 'development';
const database = knex(config[env]);
export default database;
