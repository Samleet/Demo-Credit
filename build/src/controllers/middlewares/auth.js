var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import auth from "../../helpers/auth.js";
/**
 * Auth middleware for handling authorized routes & calls
 * @return Request
 */
export default (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    /**
     * get current url user is pooling
     */
    const currentUrl = req.originalUrl;
    const protectedRoutes = [
        '/user/login',
        '/user/register',
    ];
    /**
     * check if user is authenticated or perform redirect
     */
    var user = yield auth().attempt({
        id: (_a = req.session.userId) !== null && _a !== void 0 ? _a : null
    });
    if (!user) {
        if (!protectedRoutes.includes(currentUrl)) {
            return res.status(301).redirect('/user/login');
        }
    }
    return next();
});
