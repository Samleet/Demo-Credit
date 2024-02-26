import database from "../configs/database/knex/index.js";
const table = "transactions";
const Transactions = () => database(table);
export { Transactions };
