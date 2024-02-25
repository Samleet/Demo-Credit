import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.string('telephone').nullable();
        table.string('address').nullable();
        table.string('company').nullable();
        table.string('password').notNullable();
        table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    }).then();
}

export async function down(knex: Knex): Promise<void> {
    
    knex.schema.dropTable('users').then();

}