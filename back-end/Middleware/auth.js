import BaseMiddleware from "../Core/BaseMiddleware.js";
import { getEnv } from "../Core/utils.js";
import { Redis } from "../global.js";


export default class AuthMiddleware extends BaseMiddleware {
  constructor() {
    super()
  }

  async isAuth (req, res, next) {
    try {
        //step1 ----> to get xtoken from headers :
        let xToken = req.headers['x-token'] ?? ''
        //if xToken doesn't empty do sth :
        if (xToken !== "") {
            //step2 ----> trim xToken :
            xToken = xToken.trim()
            //step3 ----> combine xToken with ACCESS_TOKEN_PREFIX to identify xToken in Redis:
            const key_access_token = getEnv("ACCESS_TOKEN_PREFIX") + xToken
            //step4 ----> check key_access_token in Redis if it exists or not :
            const userToken = await Redis.getHash(key_access_token)
            //if userToken?.user_id exists in Redis do sth  :
            if (userToken?.user_id) {
                //step5 ----> save userToken to use it in userProfile in userController to retrieve account data based on access_token which maintains user_id in itself:
                 req.userToken = userToken
                //step6 ----> let the client pass ...
                 next()
            //if userToken?.user_id doesn't exist throen an error :
            } else {
                res.status(400).json({success: false, message: "token is invalid"})
            }
            
        //if xToken is empty throw an error :
        } else {
            res.status(400).json({success: false, message: "token didn't send"})
        }
       
    } catch (e) {
        return super.toError(e)
    }
  }

}

/*
There is a contract which admin set if a client has the permisson to log in r not named is_auth 
this is a cntract between front-end and back-end 
is_auth has different states which we set for example ----> is_auth = 0 ----> authentication successfull
                                                      ----> is_auth = -1 ----> x-token didn't send
                                                      ----> is_auth = -2 ----> token invalid 
                                                      ----> and so on 
*/


/*
User status in server : 
we use status in some components like userLogin , userProfile , userRfreshToken , userLogout ----> because in these components we use authentication and it must be clear for server if user has this permission to get data or it is blocked.
there is something so important which is ----> to implemnt user status firstly you need to implement adminController and implement status in admingController then implement it in userController
status ----> status = 2 ----> login/get user profile/logout/... successful
       ----> status = 1 ----> Account is disabled 
       ----> status = 0 ----> Account is blocked
*/