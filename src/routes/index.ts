import { Router, Request, Response } from "express";
import auth from '../controllers/middlewares/auth'
import authController from '../controllers/authController'
import homeController from '../controllers/homeController'
import walletController from '../controllers/walletController'

const router = Router();


//Home Route
router.get('/', (req: Request, res: Response) => {

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
    .get('*', /* fallback any */ homeController._404)


export default router;