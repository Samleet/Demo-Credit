import { Request, Response } from "express"
import auth from "../helpers/auth"
import homeService from "../services/homeService"
import walletService from "../services/walletService"
import { getBeneficiary } from "../helpers/global"

/**
 * HomeController for handling Dashboard Logics
 * 
 * @index - Shows the dashboard
 * @notif - Displays user Notifications
 * @_404 - Handles 404 routes
 */

export default {

    'index': async (req: Request, res: Response) => {

        const transactions = await homeService().transactions();
        const wallet = await walletService().wallet();

        const flash = req.session.flash;
        req.session.flash = null;

        res.render('dashboard/index', {
            auth,
            transactions,
            wallet,
            getBeneficiary,
            ...flash,
        });

    },

    'notif': async (req: Request, res: Response) => {

        const notifications = await homeService().notifications();
        res.render('dashboard/notification', {
            notifications
        })

    },

    '_404': (req: Request, res: Response) => {

        res.send("404: The given route not found! check the url")

    }

}