import baseController from "./baseController.js";
import { registerValidation } from "../Validations/registerValidation.js";
import { loginValidation } from "../Validations/loginValidation.js";
import { forgotValidation } from "../Validations/forgotValidation.js";
import { changeValidation } from "../Validations/changeValidation.js";
import crypto from "../Core/crypto.js";
import bcrypt from "bcrypt";
import { getEnv } from "../Core/utils.js";
import UserModel from "../Models/user.js";
import token from "../Core/token.js";
import { Redis } from "../global.js";

class userController extends baseController {
  constructor() {
    super();
  }
  //------------------------------------------------------------------------------
  async userRegister(req, res) {
    try {
      //step1 ---> to get data from front-end :
      const data = req.body;
      //step2 ---> validate data :
      const { error } = registerValidation.validate(data, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({
          success: false,
          message: `validation_failed`,
          errors: error.details.map((e) => e.message),
        });
      }
      //step3 ---> perform hash and encryption on data :
      //hash password :
      const hashedPassword = await bcrypt.hash(data.password, 10); //10 ----> is salt round ----> how many times it should process and re-hash the password internally.
      //encrypt email and phone :
      const secretKey = getEnv("SECRET_KEY");
      const encryptedEmail = crypto.encryption(secretKey, data.email);
      const emailHash = crypto.hash(data.email); // for searching in database
      const encryptedPhone = crypto.encryption(secretKey, data.phone);
      //step4 ---> to make object out of model :
      const objectModel = new UserModel();
      //step5 ---> to check if the data exists in database or not ---> if data exists return an error if not proceed with registration :
      const existUser = await objectModel.findUser(emailHash);
      if (!existUser) {
        //step6 ---> store the data in json :
        const username = data.username;
        const email = encryptedEmail;
        const saveEmailHash = emailHash;
        const phone = encryptedPhone;
        const password = hashedPassword;
        await objectModel.register(
          username,
          email,
          saveEmailHash,
          phone,
          password,
        );
        return res
          .status(200)
          .json({ success: true, message: "registration_completed" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "invalid_credentials" });
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: `${error}` });
    }
  }
  //------------------------------------------------------------------------------
  async userLogin(req, res) {
    try {
      //step1 ---> get data from front-end :
      const data = req.body;
      //step2 ---> validate data :
      const { error } = loginValidation.validate(data, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({
          success: false,
          message: `validation_failed`,
          errors: error.details.map((e) => e.message),
        });
      }
      //step3 ---> destructure email and password from data :
      const email = data.email;
      const hashEmail = crypto.hash(email);
      const password = data.password;
      //step4 ---> To make user model :
      const objectModel = new UserModel();
      //step5 ---> to get user data from mongoDB :
      const loginData = await objectModel.login(hashEmail, password);
      //step6 ---> if user id exists :
      if (loginData.user_id) {
        const generateToken = await token.generate(
          loginData?.user_id,
          loginData?.status,
        );
        const access_token = generateToken.access_token;
        const refresh_token = generateToken.refresh_token;

        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: getEnv("ACCESS_TOKEN_EXPIRE_TIME") * 1000,
        });

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: getEnv("REFRESH_TOKEN_EXPIRE_TIME") * 1000 ,
        });

        return res
          .status(200)
          .json({ success: true, message: "login_successful", is_auth: 0 });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid_credential", is_auth: -3 });
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: `${error}` });
    }
  }
  //------------------------------------------------------------------------------
  async userProfile(req, res) {
    try {
      //we use userToken which we saved it in AuthMiddleware to retrieve profile data based on access_token which maintains user_id in itself:
      //we use req.userToken to identify the client and retrieve profile data :
      //we send req.userToken.user_id for mongoDB so that it gives us the  prfile data
      const objectModel = new UserModel();
      const userInfo = await objectModel.getProfile(req?.userToken?.user_id);
      const email = crypto.decryption(getEnv("SECRET_KEY"), userInfo.email);
      const phone = crypto.decryption(getEnv("SECRET_KEY"), userInfo.phone);
      //we must delete _id and password from retrieved data check it later :
      //retrieved data :
      const data = {
        userName: userInfo.username,
        email: email,
        phone: phone,
        date_time: userInfo.register_date_time,
      };
      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        data: data,
        is_auth: 0,
      });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Access denied" });
    }
  }
  //------------------------------------------------------------------------------
  async userRefreshToken(req, res) {
    try {
      //step1 ----> firstly get access_token and refresh_token from request body
      const accessToken = req.cookies.access_token;
      const refreshToken = req.cookies.refresh_token;

      if (!accessToken || !refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Token not found",
        });
      }
      //step2 ----> check if refresh token and access token exist in Redis or not :
      const key_refresh_token = getEnv("REFRESH_TOKEN_PREFIX") + refreshToken;
      const key_access_token = getEnv("ACCESS_TOKEN_PREFIX") + accessToken;
      const data = await Redis.getHash(key_refresh_token);
      //step3 ----> if data?.refresh_token && accessToken === data?.access_token do sth :
      if (data?.refresh_token && accessToken === data?.access_token) {
        //step4 ----> firstly delete previous access_token and refresh_token:
        await Redis.del(key_access_token);
        await Redis.del(key_refresh_token);
        //step5 ----> generate new token :
        const resultToken = await token.generate(data?.user_id, data?.status);
        if (typeof resultToken === "string") {
          return res
            .status(400)
            .json({ success: false, message: "Token generate error!" });
        } else {

          res.cookie("access_token", resultToken.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: getEnv("ACCESS_TOKEN_EXPIRE_TIME") * 1000,
          });

          res.cookie("refresh_token", resultToken.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: getEnv("REFRESH_TOKEN_EXPIRE_TIME") * 1000,
          });

          return res.status(200).json({
            success: true,
            message: "Refresh token has been changed.",
          });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "refresh token is invalid" });
      }
    } catch (e) {
      return res.status(400).json({ success: false, message: "Access denied" });
    }
  }
  //------------------------------------------------------------------------------
  async userLogout(req, res) {
    try {
      const accessToken = req.cookies.access_token;
      const refreshToken = req.cookies.refresh_token;

      const key_access_token = getEnv("ACCESS_TOKEN_PREFIX") + accessToken;
      const key_refresh_token = getEnv("REFRESH_TOKEN_PREFIX") + refreshToken;

      if (accessToken) {
        const key_access_token = getEnv("ACCESS_TOKEN_PREFIX") + accessToken;
        await Redis.del(key_access_token);
      }

      if (refreshToken) {
        const key_refresh_token = getEnv("REFRESH_TOKEN_PREFIX") + refreshToken;
        await Redis.del(key_refresh_token);
      }

      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return res
        .status(200)
        .json({ success: true, message: "Logout successful" });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Access denied" });
    }
  }
  //------------------------------------------------------------------------------
  async userForgotPassword(req, res) {
    try {
      //step1 ---> get data from front-end :
      const data = req.body;
      //step2 ---> validate data :
      const { error } = forgotValidation.validate(data, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: `validation_failed`,
          errors: error.details.map((e) => e.message),
        });
      }
      //step3 ---> destructure email from data :
      const email = data.email;
      const secretKey = getEnv("SECRET_KEY");
      //step4 ---> hash email to search user based on that in database
      const hashEmail = crypto.hash(email);
      //step5 ---> to make object out of model :
      const objectModel = new UserModel();
      //step6 ---> check user email :
      const user = await objectModel.findUser(hashEmail);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: `invalid_credentials` });
      }

      return res.status(200).json({ success: true, message: "email_sent" });
    } catch (error) {
      return res.status(400).json({ success: false, message: `${error}` });
    }
  }
  //------------------------------------------------------------------------------
  async userChangePassword(req, res) {
    try {
      //step1 ---> to get data from front-end :
      const data = req.body;
      //step2 ---> Validate data
     
      return res.status(200).json({
        success: true,
        message: "change_password_successful",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `${error}`,
      });
    }
  }
}

export default new userController();

/*
------------------------------Attention-------------------------------
there are some security issues in hashing and cryptography we should consider and solve later:
1.email hashing ---> const emailHash = crypto.hash(email) ---> use strong kdf (pbkdf2, bcrypt, scrypt)
2.cryptography ---> aes algorithm is weak you must use AES-256-GCM or ChaCha20-poly1305
3.in some cases password hashing is correct by bcrypt but argon2id is stronger and safer.
*/
