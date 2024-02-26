var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import walletService from "../services/walletService.js";
import { getBeneficiary } from "../helpers/global.js";
/**
 * WalletController for handling Wallet Logics
 *
 * @index - Shows the dashboard
 * @trx - Get all Transactions
 * @submit - Handles "Send,Withdraw & Funding"
 */
export default {
    'index': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const action = req.params.do;
        const transactions = yield walletService().transactions();
        const withdrawals = yield walletService().withdrawals();
        const wallet = yield walletService().wallet();
        const flash = req.session.flash;
        req.session.flash = null;
        res.render('dashboard/wallet', Object.assign(Object.assign({ action,
            wallet,
            transactions,
            withdrawals }, flash), { getBeneficiary }));
    }),
    'trx': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transactions = yield walletService().transactions();
        res.render('dashboard/transaction', {
            transactions,
            getBeneficiary
        });
    }),
    'submit': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const action = req.params.do;
        const transactions = yield walletService().transactions();
        const withdrawals = yield walletService().withdrawals();
        const wallet = yield walletService().wallet();
        const { amount } = req.body;
        const request = yield walletService()[action](req.body);
        if (request === null || request === void 0 ? void 0 : request.error) {
            res.render('dashboard/wallet', {
                balloon: 'error',
                message: request.error[0],
                action,
                wallet,
                transactions,
                withdrawals,
            });
            return;
        }
        req.session.flash = {
            'balloon': 'success',
            'message': 'Transaction of N' + amount + ' was successful'
        };
        res.redirect(req.originalUrl);
    })
};
