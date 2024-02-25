import { table } from "console";
import type { Knex } from "knex";
import payment from '../../../../enums/payment'
import status from '../../../../enums/status'

export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('transactions', (table: Knex.TableBuilder) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.integer('beneficiary_id').unsigned();
        table.float('amount').notNullable();

        table.enum('type', [
            payment.CREDIT,
            payment.DEBIT
        ]).notNullable();

        table.string('reference').notNullable();

        table.enum('status', [
            status.PENDING,
            status.COMPLETED,
            status.DENIED
        ]).defaultTo(status.PENDING).notNullable();

        table.string('signature').nullable();
        
        table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());

        table.foreign('user_id').references('users.id');
        table.foreign('beneficiary_id').references('users.id');
    }).then();
}

export async function down(knex: Knex): Promise<void> {
    
    knex.schema.dropTable('transactions').then();

}