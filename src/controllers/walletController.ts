import { Request, Response } from "express"
import walletService from "../services/walletService"
import { getBeneficiary } from "../helpers/global"

/**
 * WalletController for handling Wallet Logics
 * 
 * @index - Shows the dashboard
 * @trx - Get all Transactions
 * @submit - Handles "Send,Withdraw & Funding" 
 */

export default {

    'index': async (req: Request, res: Response) => {

        const action = req.params.do;
        const transactions = await walletService().transactions();
        const withdrawals = await walletService().withdrawals();
        const wallet = await walletService().wallet();

        const flash = req.session.flash;
        req.session.flash = null;

        res.render('dashboard/wallet', {
            action,
            wallet,
            transactions,
            withdrawals,
            ...flash,
            getBeneficiary
        })

    },

    'trx': async (req: Request, res: Response) => {

        const transactions = await walletService().transactions();

        res.render('dashboard/transaction', {
            transactions,
            getBeneficiary
        })

    },

    'submit': async (req: Request, res: Response) => {
        const action = req.params.do;
        const transactions = await walletService().transactions();
        const withdrawals = await walletService().withdrawals();
        const wallet = await walletService().wallet();

        const { amount } = req.body;
        const request = await walletService()[action]( req.body )

        if(request?.error){            
            res.render('dashboard/wallet', {
                balloon: 'error',
                message: request.error[0],
                action,
                wallet,
                transactions,
                withdrawals,
                getBeneficiary
            });
            return;
        }

        req.session.flash = {

            'balloon': 'success',
            'message': 'Transaction of N'+amount+' was successful'

        }

        res.redirect('/user/dashboard');

    }

}