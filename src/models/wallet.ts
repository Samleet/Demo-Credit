import database from "../configs/database/knex/index"

const table: string = "wallets";

type Wallet = {
    id: number,
    user_id: number,
    balance?: number,
    reference: string
}

const Wallets = () => database<Wallet>(table);

export { 
    Wallet as default, 
    Wallets
}