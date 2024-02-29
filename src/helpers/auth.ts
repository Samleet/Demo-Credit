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

import { Request } from "express"
import User, { Users } from "../models/user"
import bcrypt from "bcrypt"

let user: {}; //local strategy to get user

const auth = () => {

    const login = async (credential) => {
        let password = (null)

        if((credential['password'] != undefined) == ( true )){

            password = credential['password']
            delete /**/credential['password']

        }

        const auth = await Users().where(credential).first();
        if(auth){

            if(password != null){

                if(!await bcrypt.compare(
                    password, auth.password // verifying hash
                )) return false;

            }
            user = auth;
            return true;
        }

        return false;
    };

    const logout = (request: any) => request.session.destroy(

        () => {
            user = {}
        }
    );

    return {

        'attempt': (data) => (async()=> await login (data))(),

        'logout': (request: Request) => /* */ logout(request),

        'user': () => user

    }
}

export default auth;