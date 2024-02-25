import { table } from "console";
import type { Knex } from "knex";
import status from '../../../../enums/status'


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('withdrawals', (table: Knex.TableBuilder) => {    
        table.increments('id');
        table.integer('user_id').unsigned();
        table.float('amount').notNullable();

        table.enum('status', [
            status.PENDING,
            status.COMPLETED,
            status.DENIED
        ]).defaultTo(status.PENDING).notNullable();
        
        table.string('reference').notNullable();
        table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());

        table.foreign('user_id').references('users.id');
    }).then();
}

export async function down(knex: Knex): Promise<void> {
    
    knex.schema.dropTable('withdrawals').then();

}