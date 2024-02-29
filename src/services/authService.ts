import knex, { QueryBuilder } from "knex"
import bcrypt from "bcrypt"
import User, { Users } from "../models/user"
import { Wallets } from "../models/wallet"
import { Notifications } from "../models/notification"
import auth from "../helpers/auth"
import { v4 as uuidv4 } from "uuid"
import messages from "../enums/message"


const authService = () => {
    return {
        login: async (request: any) => {
            
            const /**/ user: any = await auth().attempt(request);
            if(user) {

                return auth().user();

            };

            return false;

        },

        register: async (request: any) => {
            const response: /* **/ {[key: string]: string[]} = {
                'error': [],
            }

            const { 
                firstname,
                lastname,
                email,
                telephone,
                password,
                conf_password
            } = request;

            /**
             * @Validation to check for unique data and password
             * 
             * What am i doing? - This is supposed to be emitted 
             * from a controller, but i am trying to keep things 
             * bare-bone for an MVP since the project is minimal
             */

            let user = await Users().where('email',email.trim())
            .select();
            if(user.length > 0){
                
                response.error.push("User email already exist");
                return response;

            }
            if(password != conf_password){

                response.error.push("The passwords dont match");
                return response;

            }

            /**
             * *************************************************
             */



            const hashPass = /**/ await bcrypt.hash(password,10)

            //create user account
            const newUser = await Users().insert({
                firstname,
                lastname,
                email,
                telephone,
                password: hashPass
            });

            if(newUser.length > 0){
                const id = newUser[0];
                const user: any = await Users().where({'id':id})
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
                }).then()
            }

            return true;

        },
    
        profile: async (request: any) => auth().user( ), ///////

        logout: async (request: any) => auth().logout( request ),

    }
}

export default authService;