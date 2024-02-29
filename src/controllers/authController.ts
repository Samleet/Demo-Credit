import { Request, Response } from "express"
import authService from "../services/authService"

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

    'loginForm': async (req: Request, res: Response) => {

        return res.render('auth/login');

    },
    
    'login': async (req: Request, res: Response) => {

        const request = req.body;
        const { email, password } = req.body;
        // console.log(request)

        var login: any = await authService().login(request);
        if(!login){

            res.render('auth/login', {

                error: "Login Failed! invalid credentials"

            });

            return;

        }

        req.session.userId = login.id;

        return res.redirect('/user/dashboard');

    },

    'profile': async (req: Request, res: Response) => {

        const profile = await authService().profile(req);
        
        return res.json(profile);

    },

    'logout': async (req: Request, res: Response) => {
        
        authService().logout(req);

        return res.redirect('/');

    },

    'registerForm': async (req: Request, res: Response) => {

        return res.render('auth/register');

    },

    'register': async (req: Request, res: Response) => {

        const request = req.body;
        const register: any = await authService().register(
            request
        );

        if(register?.error){            
            res.render('auth/register', {
                error: register.error[0],
            });
            
            return;
        }

        res.redirect('/user/login')

        ////////////////////////////////////////////////////
        
    },
}