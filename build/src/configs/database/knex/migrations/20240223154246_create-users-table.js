var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        knex.schema.createTable('users', (table) => {
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
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        knex.schema.dropTable('users').then();
    });
}
