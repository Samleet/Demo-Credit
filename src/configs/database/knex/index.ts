/**
 * Database Connection using KnexJS ORM modules
 */

import knex, { Knex } from 'knex';
import dotenv  from "dotenv";
import config from './config';


dotenv.config( )

const env
    : any = process.env.DB_ENV || 'development';
/**
console.log(env)
*/

const database: Knex = /** */ knex(config[env]);

export default database;