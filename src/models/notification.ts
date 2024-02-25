import database from "../configs/database/knex/index"

const table: string = "notifications";

type Notification = {
    id: number,
    user_id: number,
    message: string,
}

const Notifications = () => database<Notification>(table);

export { 
    Notification as default, 
    Notifications
}