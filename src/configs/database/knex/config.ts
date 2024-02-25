import type { Knex } from "knex";

/**
 * Database config for different environments
 */

const config: {[key: string]: Knex.Config} = {
  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'knexjs',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: false,
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
      directory: './migrations'
    },
    seeds: {
      directory: './seeders'
    }
  },
};

export default config;