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
import { Notifications } from "../models/notification.js";
import { Transactions } from "../models/transaction.js";
const homeService = () => {
    const user = auth().user();
    return {
        transactions: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Transactions().where('user_id', user.id)
                .orderBy('id', 'desc')
                .limit(10)
                .select();
        }),
        notifications: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Notifications().where('user_id', user.id)
                .orderBy('id', 'desc')
                .select();
        }),
    };
};
export default homeService;
