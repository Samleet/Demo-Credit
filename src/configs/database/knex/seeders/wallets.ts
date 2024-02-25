import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import Wallet from "../../../../models/wallet"


export async function factory(seeds: number){
    
    const data: Wallet[] = [];
    const offset = 1;

    for(var i = 1; i < (seeds + offset); i++){

        const payload = {
            id: i,
            user_id: i,
            balance: 100000 * i,
            reference: uuidv4()
        };
        data.push(payload);
    }

    return data;
    
}

export async function seed(knex: Knex): Promise<void> {
    await knex("wallets").del();

    await knex("wallets").insert(await factory(5));
};