import { getEnv } from "../Core/utils.js";
import crypto from "./crypto.js";
import { Redis } from "../global.js";

class Token {
  constructor() {}

  async generate(user_id, status) {
    try {
      //to make sure user_id is a string :
      user_id = user_id + "";
      //to generate access-token and refresh-token :
      const accessToken = crypto.encryption(getEnv("SECRET_KEY"), user_id);
      const refreshToken = crypto.hash(accessToken);
      //To store access-token and refresh-token in data :
      const data = {
        access_token: accessToken,
        refresh_token: refreshToken, // it is better to use IP in our refresh token so that if someone used that refresh-token with another IP , can't access the data of profile
        user_id: user_id,
        status: status,
      };

      //To store refresh-token and access-token in redis: 
      const key_access_token = getEnv("ACCESS_TOKEN_PREFIX") + accessToken  //we use this to have a format like    access_token_a1324lkm23456lkdm25clanan    in redis
      await Redis.setHash(key_access_token, data, getEnv("ACCESS_TOKEN_EXPIRE_TIME"))
      const key_refresh_token = getEnv("REFRESH_TOKEN_PREFIX") + refreshToken  //we use this to have a format like    refresh_token_a1324lkm23456lkdm25clanan    in redis
      await Redis.setHash(key_refresh_token,data,getEnv("REFRESH_TOKEN_EXPIRE_TIME"))

      return data
    } catch (e) {
      return e.toString();
    }
  }
}

export default new Token();
