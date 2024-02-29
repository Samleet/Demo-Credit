import { Knex } from "knex"
import messages from "../../../../enums/message"
import Notification from "../../../../models/notification"


export async function factory(seeds: number){
    
    const data: Notification[] = [];
    const offset = 1;

    for(var i = 1; i < (seeds + offset); i++){

        const payload = {
            id: i,
            user_id: i,
            message: messages.welcome,
        };
        data.push(payload);
    }

    return data;
    
}

export async function seed(knex: Knex): Promise<void> {
    await knex("notifications").del();

    await knex("notifications").insert(await factory(5));
};