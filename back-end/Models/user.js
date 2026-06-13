import mongoose from "mongoose";
import { getEnv, toJSON } from "../Core/utils.js";
import UserSchema from "../Schema/user.js";
import dateTime from "../Core/dateTime.js";
import bcrypt from "bcrypt";
import crypto from "../Core/crypto.js";

class UserModel {
  constructor() {
    // Use mongoose.model() which works with the default connection
    this.model = mongoose.model("user", UserSchema);
  }

  //Function to hash password for getting and setting in mongoDB :
    hashPassword(password, user_id) {
      return crypto.hash(user_id + password + user_id);
    }

     async getUserData (data) {
      delete data.user_id
      delete data.password
      return data 
  }

  async getProfile (user_id) {
  
     if (user_id) {
      const data = await this.model.findOne({ "_id": user_id });
      if (data) {
        return data
      }else {
        return null
      }
    } else {
      return null;
    }
  }

    //To get data from mongoDB for login page :
  async login(email, password) {
    try {
      //step1 ---> find user based on hashed email in mongoDB :
      const result = await this.findUser(email)
      if (!result) {
        return {
        error: true,
        message: "Email or password is incorrect",
      };
      }
      //step2 ---> check if password correct or not in mongoDB :
      const passwordMatch = await bcrypt.compare(password, result.password)
      if (!passwordMatch) {
        return {
        error: true,
        message: "Email or password is incorrect", }
      }
      //step3 ---> if email and password is correct then check with user id :
      if (result._id) {
        const user_id = result._id + ""
        const emailDecryption = await crypto.decryption(getEnv("SECRET_KEY"),  result.email)
        const phoneDecryption = await crypto.decryption(getEnv("SECRET_KEY"), result.phone)
        return {
          user_id : user_id,
          email : emailDecryption,
          userName : result.username,
          phone : phoneDecryption,

        }
      }

      return {
        error: true,
        message: "Email or password is incorrect",
      };
    } catch (e) {
      return {
        error: true,
        message: "Login failed",
      };
    }
  }
  async register(username, email, emailHash, phone, password) {
    const data = {
      username,
      email,
      emailHash,
      phone,
      password,
      register_date_time: dateTime.toString(),
    };

    const row = new this.model(data);
    const result = await row.save();
  }

  async findUser(emailHash) {
    return await this.model.findOne({ emailHash });
  }

  async updatePass(emailHash, newHashedPassword) {
    return await this.model.updateOne(
      { emailHash },
      { $set: { password: newHashedPassword } }
    );
  }
}

export default UserModel;
