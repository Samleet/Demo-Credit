import database from "../configs/database/knex/index.js";
const table = "wallets";
const Wallets = () => database(table);
export { Wallets };
