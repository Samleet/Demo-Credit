import { Router } from "express";
import auth from '../controllers/middlewares/auth.js';
import authController from '../controllers/authController.js';
import homeController from '../controllers/homeController.js';
import walletController from '../controllers/walletController.js';
const router = Router();
//Home Route
router.get('/', (req, res) => {
    const app = process.env.APP_NAME;
    const version = process.env.APP_VERSION;
    const data = {
        app, version
    };
    res.status(200).render('index', (data));
});
//Auth Routes
router
    .use('/user', auth)
    .get('/user/login', authController.loginForm)
    .post('/user/login', authController.login)
    .get('/user/register', authController.registerForm)
    .post('/user/register', authController.register)
    .get('/user/me', authController.profile)
    .get('/user/logout', authController.logout)
    //User Routes
    .get('/user/dashboard', homeController.index)
    .get('/user/notifications', homeController.notif)
    .get('/user/wallet/:do', walletController.index)
    .post('/user/wallet/:do', walletController.submit)
    .get('/user/transactions', walletController.trx)
    //404 Routes
    .get('*', /* fallback any */ homeController._404);
export default router;
