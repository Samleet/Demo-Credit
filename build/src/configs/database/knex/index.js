/**
 * Database Connection using KnexJS ORM modules
 */
import knex from 'knex';
import dotenv from "dotenv";
import config from './config.js';
dotenv.config();
const env = process.env.DB_ENV || 'development';
/**
console.log(env)
*/
const database = /** */ knex(config[env]);
export default database;
