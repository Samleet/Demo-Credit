import database from "../configs/database/knex/index"

const table: string = "users";

type User = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    telephone: string,
    address?: any,
    company?: any,
    password: string,
    created_at?: string,
    updated_at?: string,
}

const Users = () => database<User>(table);

export { 
    User as default, 
    Users
}