import dotenv from "dotenv";
/**
 * Database config for different environments
 */
dotenv.config();
const env = process.env;
const config = {
    development: {
        client: 'mysql',
        connection: {
            host: env.DB_HOST,
            port: env.DB_PORT,
            user: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_DATABASE,
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations',
            extension: 'ts',
            directory: './migrations'
        },
        seeds: {
            directory: './seeders'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: env.DB_HOST,
            port: env.DB_PORT,
            user: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_DATABASE,
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
