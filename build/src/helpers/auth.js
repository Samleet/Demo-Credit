/**
 * AuthHelper: To manage all authentication protocols easily
 *
 * @attempt
 * @returns: boolean
 * @description: try auth on User model

 * @logout
 * @returns: void
 * @description: destroy the authenticated user from session

 * @user
 * @returns: User
 * @description: get authenticated user
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Users } from "../models/user.js";
import bcrypt from "bcrypt";
let user; //local strategy to get user
const auth = () => {
    const login = (credential) => __awaiter(void 0, void 0, void 0, function* () {
        let password = (null);
        if ((credential['password'] != undefined) == (true)) {
            password = credential['password'];
            delete /**/ credential['password'];
        }
        const auth = yield Users().where(credential).first();
        if (auth) {
            if (password != null) {
                if (!(yield bcrypt.compare(password, auth.password // verifying hash
                )))
                    return false;
            }
            user = auth;
            return true;
        }
        return false;
    });
    const logout = (request) => request.session.destroy(() => {
        user = {};
    });
    return {
        'attempt': (data) => (() => __awaiter(void 0, void 0, void 0, function* () { return yield login(data); }))(),
        'logout': (request) => /* */ logout(request),
        'user': () => user
    };
};
export default auth;
