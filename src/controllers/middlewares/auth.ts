import { Request, Response, NextFunction } from "express";
import auth from "../../helpers/auth";

/**
 * Auth middleware for handling authorized routes & calls
 * @return Request
 */
export default async (
    req: Request, res: Response, next: NextFunction) => {
    
    /**
     * get current url user is pooling
     */
    const currentUrl = req.originalUrl;
    const protectedRoutes: string[] = [
        '/user/login',
        '/user/register',
    ];

    /**
     * check if user is authenticated or perform redirect
     */
    var user = await auth().attempt({
        id: req.session.userId ?? null
    });
    
    if(!user){

        if(!protectedRoutes.includes(
            currentUrl
        )) {

            return res.status(301).redirect('/user/login');
            
        }
    }

    return next();

}