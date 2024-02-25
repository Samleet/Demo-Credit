import Transaction from "../models/transaction"
import payment from "../enums/payment"
import { Users } from "../models/user"


const getBeneficiary = /* async */ (tx: Transaction) => {

    let user: any = {}, _model = {
        firstname: '_firstname',
        lastname: '_lastname'
    };

    let userId = tx.type == payment.CREDIT 
                         ? tx.beneficiary_id : tx.user_id;
    

    /**
     * i am commenting this code because the KnexJS model
     * is asynchronous
     * 
    */
    const users: any = /* await */ Users().where(
        'id', userId
    ).first();

    /**
     * 
     * should have rewrite this but leaving it for further
     * case-study
     * 
     */
    // return users;

    return _model;

}

export {
    getBeneficiary
}