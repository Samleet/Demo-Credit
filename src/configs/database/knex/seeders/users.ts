import { Knex } from "knex"
import bcrypt from "bcrypt"
import User from "../../../../models/User"


const password = async (pwd: string) => bcrypt.hash(pwd, 10);

const faker = (): object => {
    return [
        ["Lendsqr","HR","lendsqrhr@gmail.com"],
        ["Smith","John","smithjohn@gmail.com"],
        ["Mary","Parker","maryparker@gmail.com"],
        ["Peter","Milla","petermilla@gmail.com"],
        ["Silva","Trisha","silvatrisha@gmail.com"],
    ];
}

export async function factory(seeds: number){
    
    const data: User[] = [];
    const offset = 1;

    for(var i = 1; i < (seeds + offset); i++){

        const payload = {
            id: i,
            firstname: faker()[i-1][0],
            lastname: faker()[i-1][1],
            email: faker()[i-1][2],
            telephone: `0810000000${i}`,
            password: await password("123456")
        };
        data.push(payload);
    }

    return data;

}

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    await knex("users").insert(await factory(5));
};