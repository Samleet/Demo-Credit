import { table } from "console"
import type { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('wallets', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.double('balance').defaultTo(0).notNullable();
        table.string('reference').notNullable();
        table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());

        table.foreign('user_id').references('users.id');
    }).then();
}

export async function down(knex: Knex): Promise<void> {
    
    knex.schema.dropTable('wallets').then();

}