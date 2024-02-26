import database from "../configs/database/knex/index.js";
const table = "withdrawals";
const Withdrawals = () => database(table);
export { Withdrawals };
