import database from "../configs/database/knex/index.js";
const table = "users";
const Users = () => database(table);
export { Users };
