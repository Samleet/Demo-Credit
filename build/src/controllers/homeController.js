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
import homeService from "../services/homeService.js";
import walletService from "../services/walletService.js";
import { getBeneficiary } from "../helpers/global.js";
/**
 * HomeController for handling Dashboard Logics
 *
 * @index - Shows the dashboard
 * @notif - Displays user Notifications
 * @_404 - Handles 404 routes
 */
export default {
    'index': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transactions = yield homeService().transactions();
        const wallet = yield walletService().wallet();
        const flash = req.session.flash;
        req.session.flash = null;
        res.render('dashboard/index', Object.assign({ auth,
            transactions,
            wallet,
            getBeneficiary }, flash));
    }),
    'notif': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const notifications = yield homeService().notifications();
        res.render('dashboard/notification', {
            notifications
        });
    }),
    '_404': (req, res) => {
        res.send("404: The given route not found! check the url");
    }
};
