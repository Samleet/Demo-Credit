/**
 * Database Connection using KnexJS
 */

import knex, { Knex } from 'knex';
import config from './config';

const env = process.env.DB_ENV || 'development';

const database: Knex = knex(config[env]);

export default database;