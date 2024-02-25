import database from "../configs/database/knex/index"
import status from "../enums/status"

const table: string = "withdrawals";

type Withdrawal = {
    id: number,
    user_id: number,
    amount: number,
    status: status,
    reference: string
}

const Withdrawals = () => database<Withdrawal>(table);

export { 
    Withdrawal as default, 
    Withdrawals
}