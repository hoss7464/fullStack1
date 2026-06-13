import crypto from "crypto"
import { getEnv } from "./utils.js"

class Crypto {
    #secretKey = ""
    constructor() {
        this.#secretKey = getEnv("SECRET_KEY")
    }
    //Function to hash data 
    hash (str) {
       try {
        return crypto.createHmac("sha256", this.#secretKey).update(str.toString()).digest("hex")
       } catch (error) {
        return ""
       }
    }
    //Function to convert string into base64 
    toBase64 (str) {
        try {
            return Buffer.from(str.toString()).toString("base64url")
        } catch (error) {
            return ""
        }
    }
    //Function to convert base64 into string 
    fromBase64 (str) {
        try {
            return Buffer.from(str.toString(str), "base64url").toString("utf-8")
        } catch (error) {
            return ""
        }
    }
    //Function to encrypt data 
    encryption (key, data) {
        try {
            //step1 ---> make the algorithm
            const hashKey = this.hash(key)
            const key2 = hashKey.substring(0, 32)
            const iv = hashKey.slice(32, -16)
            const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key2), iv)
            //step2 ---> prepare the data 
            const data2 = {
                "a" : Math.random(),
                "message" : data,
                "z" : Math.random()
            }
            const dataFinal = JSON.stringify(data2)
            //step3 ---> encrypt data wit encryption algorithm :
            let encrypted = cipher.update(dataFinal, "utf-8", "base64")
            encrypted += cipher.final("base64")
            return this.toBase64(encrypted)
        } catch (error) {
            return ""
        }
    }
    //Function to dencrypt data 
    decryption (key, data) {
        try {
            const hashKey = this.hash(key)
            const key2 = hashKey.substring(0, 32)
            const iv= hashKey.slice(32, -16)
            data = this.fromBase64(data)
            const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key2),iv)
            let decrypted = decipher.update(data, "base64", "utf-8")
            decrypted += decipher.final("utf-8")
            const decryptedFinal = JSON.parse(decrypted)
            return decryptedFinal?.message ?? ""
        } catch (error) {
            return ""
        }
    }
}

export default new Crypto()





/*
hash ----> password 
Encrypt ----> email , phone 
plain text ----> username , createdAt, role
attention ----> do not store confirmPassword 
*/