import auth from "../helpers/auth";
import { Wallets } from "../models/wallet"
import { Transactions } from "../models/transaction"
import status from "../enums/status"
import payment from "../enums/payment"
import { Withdrawals } from "../models/withdrawal"
import { v4 as uuidv4 } from 'uuid';
import { Notifications } from "../models/notification"
import messages from "../enums/message"
import { Users } from "../models/user"


const walletService = () => {
    const user: any = auth().user();

    return {
        wallet: async () => {

            return await Wallets().where('user_id', '=',user.id)
                .first();
            
        },

        withdrawals: async () => {

            return await Withdrawals().where('user_id', user.id)
                .orderBy('id','desc')
                .select();
            
        },

        transactions: async () => {

            return await Transactions().where('user_id',user.id)
                .orderBy('id','desc')
                .select();
            
        },

        withdraw: async (data) => {

            const response: /* **/ {[key: string]: string[]} = {
                'error': [],
            }
            
            let wallet: any = await walletService().wallet(/**/)
            let amount = data.amount;

            if(amount > wallet.balance){

                response.error.push("You dont have enough funds");
                return response;

            }


            //process withdrawal
            Withdrawals().insert({
                user_id: user.id,
                amount: amount,
                status: status.PENDING,
                reference: uuidv4()
            }).then();

            //debit user wallet
            Wallets()
                .where('user_id',user.id)
                .update({balance: /**/ (wallet.balance - amount)
            }).then();

            //send notification
            Notifications().insert({
                user_id: user.id,
                message: messages.withdraw
            }).then()

            return true;

        },

        send: async (data) => {

            const response: /* **/ {[key: string]: string[]} = {
                'error': [],
            }

            let { email, amount } = data;
            
            amount = parseFloat(amount.replace(new RegExp (/\D/)
            ,''));

            let wallet: any = await walletService().wallet(/**/)
            let beneficiary = await Users().where('email',email)
            .whereNot({
                email: user.email
            }).first();

            if(beneficiary == null){

                response.error.push("Beneficiary does not exist");
                return response;

            }
            if(amount > wallet.balance){

                response.error.push("You dont have enough funds");
                return response;

            }

            const account: any = 
                        await Wallets()
                        .where('user_id',beneficiary.id).first();
            
            const me: string = 
                user.firstname +' '+ user.lastname;
            const to: string = 
                beneficiary.firstname +' '+ beneficiary.lastname;

            
            //process transaction
            Transactions().insert({
                user_id: user.id,
                beneficiary_id: beneficiary.id,
                amount: amount,
                type: payment.DEBIT,
                status: status.COMPLETED,
                reference: uuidv4()
            }).then();

            //debit user wallet
            Wallets()
                .where('user_id',user.id)
                .update({balance: /**/ (wallet.balance - amount)
            }).then();

            //send notification
            Notifications().insert({
                user_id: user.id,
                message: `You've transfered N${amount} to ${to}`
            }).then()


            //process transaction
            Transactions().insert({
                user_id: beneficiary.id,
                beneficiary_id: user.id,
                amount: amount,
                type: payment.CREDIT,
                status: status.COMPLETED,
                reference: uuidv4()
            }).then();

            //credit user wallet
            Wallets()
                .where('user_id',beneficiary.id)
                .update({balance: /**/ (account.balance+amount)
            }).then();

            //send notification
            Notifications().insert({
                user_id: beneficiary.id,
                message: `You've received N${amount} from ${me}`
            }).then()

            return true;

        },

        fund: async (data) => {

            const response: /* **/ {[key: string]: string[]} = {
                'error': [],
            }

            let wallet: any = await walletService().wallet(/**/)
            let amount = data.amount;
            amount = parseFloat(amount.replace(new RegExp (/\D/)
            ,''));

            //topup user wallet
            Wallets()
                .where('user_id',user.id)
                .update({balance: /**/ (wallet.balance + amount)
            }).then();

            //send notification
            Notifications().insert({
                user_id: user.id,
                message: 'Wallet successfully funded: N' +amount
            }).then()

            return true;

        },

    }
}

export default walletService;