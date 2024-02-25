import database from "../configs/database/knex/index"
import status from "../enums/status"
import payment from "../enums/payment"

const table: string = "transactions";

type Transaction = {
    id: number,
    user_id: number,
    beneficiary_id: number,
    amount: number,
    type: payment,
    reference: string,
    status: status,
    created_at?: string,
    updated_at?: string,
}

const Transactions = () => database<Transaction>(table);

export { 
    Transaction as default, 
    Transactions
}