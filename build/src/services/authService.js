var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { Users } from "../models/user.js";
import { Wallets } from "../models/wallet.js";
import { Notifications } from "../models/notification.js";
import auth from "../helpers/auth.js";
import { v4 as uuidv4 } from 'uuid';
import messages from "../enums/message.js";
const authService = () => {
    return {
        login: (request) => __awaiter(void 0, void 0, void 0, function* () {
            const /**/ user = yield auth().attempt(request);
            if (user) {
                return auth().user();
            }
            ;
            return false;
        }),
        register: (request) => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                'error': [],
            };
            const { firstname, lastname, email, telephone, password, conf_password } = request;
            /**
             * @Validation to check for unique data and password
             *
             * What am i doing? - This is supposed to be emitted
             * from a controller, but i am trying to keep things
             * bare-bone for an MVP since the project is minimal
             */
            let user = yield Users().where('email', email.trim())
                .select();
            if (user.length > 0) {
                response.error.push("User email already exist");
                return response;
            }
            if (password != conf_password) {
                response.error.push("The passwords dont match");
                return response;
            }
            /**
             * *************************************************
             */
            const hashPass = /**/ yield bcrypt.hash(password, 10);
            //create user account
            const newUser = yield Users().insert({
                firstname,
                lastname,
                email,
                telephone,
                password: hashPass
            });
            if (newUser.length > 0) {
                const id = newUser[0];
                const user = yield Users().where({ 'id': id })
                    .first();
                //create user wallet
                Wallets().insert({
                    user_id: user.id,
                    balance: 0,
                    reference: uuidv4()
                }).then();
                //send notification
                Notifications().insert({
                    user_id: user.id,
                    message: messages.welcome
                }).then();
            }
            return true;
        }),
        profile: (request) => __awaiter(void 0, void 0, void 0, function* () { return auth().user(); }), ///////
        logout: (request) => __awaiter(void 0, void 0, void 0, function* () { return auth().logout(request); }),
    };
};
export default authService;
