var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import auth from "../helpers/auth.js";
import { Wallets } from "../models/wallet.js";
import { Transactions } from "../models/transaction.js";
import status from "../enums/status.js";
import payment from "../enums/payment.js";
import { Withdrawals } from "../models/withdrawal.js";
import { v4 as uuidv4 } from 'uuid';
import { Notifications } from "../models/notification.js";
import messages from "../enums/message.js";
import { Users } from "../models/user.js";
const walletService = () => {
    const user = auth().user();
    return {
        wallet: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Wallets().where('user_id', '=', user.id)
                .first();
        }),
        withdrawals: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Withdrawals().where('user_id', user.id)
                .orderBy('id', 'desc')
                .select();
        }),
        transactions: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Transactions().where('user_id', user.id)
                .orderBy('id', 'desc')
                .select();
        }),
        withdraw: (data) => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                'error': [],
            };
            let wallet = yield walletService().wallet( /**/);
            let amount = data.amount;
            if (amount > wallet.balance) {
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
                .where('user_id', user.id)
                .update({ balance: /**/ (wallet.balance - amount)
            }).then();
            //send notification
            Notifications().insert({
                user_id: user.id,
                message: messages.withdraw
            }).then();
            return true;
        }),
        send: (data) => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                'error': [],
            };
            let { email, amount } = data;
            amount = parseFloat(amount.replace(new RegExp(/\D/), ''));
            let wallet = yield walletService().wallet( /**/);
            let beneficiary = yield Users().where('email', email)
                .whereNot({
                email: user.email
            }).first();
            if (beneficiary == null) {
                response.error.push("Beneficiary does not exist");
                return response;
            }
            if (amount > wallet.balance) {
                response.error.push("You dont have enough funds");
                return response;
            }
            const account = yield Wallets()
                .where('user_id', beneficiary.id).first();
            const me = user.firstname + ' ' + user.lastname;
            const to = beneficiary.firstname + ' ' + beneficiary.lastname;
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
                .where('user_id', user.id)
                .update({ balance: /**/ (wallet.balance - amount)
            }).then();
            //send notification
            Notifications().insert({
                user_id: user.id,
                message: `You've transfered N${amount} to ${to}`
            }).then();
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
                .where('user_id', beneficiary.id)
                .update({ balance: /**/ (account.balance + amount)
            }).then();
            //send notification
            Notifications().insert({
                user_id: beneficiary.id,
                message: `You've received N${amount} from ${me}`
            }).then();
            return true;
        }),
        fund: (data) => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                'error': [],
            };
            let wallet = yield walletService().wallet( /**/);
            let amount = data.amount;
            amount = parseFloat(amount.replace(new RegExp(/\D/), ''));
            //topup user wallet
            Wallets()
                .where('user_id', user.id)
                .update({ balance: /**/ (wallet.balance + amount)
            }).then();
            //send notification
            Notifications().insert({
                user_id: user.id,
                message: 'Wallet successfully funded: N' + amount
            }).then();
            return true;
        }),
    };
};
export default walletService;
