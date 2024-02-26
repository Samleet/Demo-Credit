var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import authService from "../services/authService.js";
/**
 * AuthController for handling Authentication Logics
 *
 * @loginForm - Shows the Login Form
 * @login - Perform Login Logic
 * @registerForm - Perform Register Form
 * @register - Perform Login Logic
 * @profile - Get user profile
 * @logout - Logout out of the dashboard
 */
export default {
    'loginForm': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.render('auth/login');
    }),
    'login': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const request = req.body;
        const { email, password } = req.body;
        // console.log(request)
        var login = yield authService().login(request);
        if (!login) {
            res.render('auth/login', {
                error: "Login Failed! invalid credentials"
            });
            return;
        }
        req.session.userId = login.id;
        return res.redirect('/user/dashboard');
    }),
    'profile': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const profile = yield authService().profile(req);
        return res.json(profile);
    }),
    'logout': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        authService().logout(req);
        return res.redirect('/');
    }),
    'registerForm': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.render('auth/register');
    }),
    'register': (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const request = req.body;
        const register = yield authService().register(request);
        if (register === null || register === void 0 ? void 0 : register.error) {
            res.render('auth/register', {
                error: register.error[0],
            });
            return;
        }
        res.redirect('/user/login');
        ////////////////////////////////////////////////////
    }),
};
