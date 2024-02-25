import auth from "../helpers/auth";
import { Notifications } from "../models/notification"
import { Transactions } from "../models/transaction"


const homeService = () => {
    const user: any = auth().user();

    return {
        transactions: async () => {

            return await Transactions().where('user_id',user.id)
                .orderBy('id','desc')
                .limit(10)
                .select();
            
        },

        notifications: async () => {
            
            return await Notifications().where('user_id',user.id)
                .orderBy('id','desc')
                .select();
            
        },
    }
    
}

export default homeService;