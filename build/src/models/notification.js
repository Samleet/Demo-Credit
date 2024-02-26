import database from "../configs/database/knex/index.js";
const table = "notifications";
const Notifications = () => database(table);
export { Notifications };
