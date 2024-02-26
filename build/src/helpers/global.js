import payment from "../enums/payment.js";
import { Users } from "../models/user.js";
const getBeneficiary = /* async */ (tx) => {
    let user = {}, _model = {
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
    const users = /* await */ Users().where('id', userId).first();
    /**
     *
     * should have rewrite this but leaving it for further
     * case-study
     *
     */
    // return users;
    return _model;
};
export { getBeneficiary };
