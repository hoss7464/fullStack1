import ioredis from "ioredis";
import { stringify, toNumber, isJSON, toJSON } from "./utils.js";

class Redis {
  #URI = null;
  #redis = null;
  get redis() {
    return this.#redis;
  }

  async connect(URI) {
    try {
      this.#URI = URI;
      this.#redis = new ioredis(this.#URI, { lazyConnect: true });
      await this.#redis.connect();
      return true;
    } catch (e) {
      return false;
    }
  }
  //Function to set data on redis :
  async set(key, data = {}, ex = 0) {
    try {
      //change data from json to object and make data conditional based on type :
      data = typeof data === "string" ? data : stringify(data);
      //convert data to number :
      ex = toNumber(ex) > 0 ? ex : 0;
      if (ex > 0) {
        //for some data which needs EX :
        await this.#redis.set(key, data, "EX", ex);
      } else {
        //for some data which doesn't need EX :
        await this.#redis.set(key, data);
      }
    } catch (e) {
      return false;
    }
  }
  //Function to get data from redis :
  async get(key) {
    try {
      const result = await this.#redis.get(key);
      if (result) {
        return isJSON(result) ? toJSON(result) : result;
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
  //Funcion to delete data from redis :
  async del(key) {
    try {
      await this.#redis.del(key);
      return true;
    } catch (e) {
      return false;
    }
  }
  //Function to use hset method in redis :
  async setHash(key, data = {}, ex = 0) {
    try {
      ex = toNumber(ex) > 0 ? ex : 0;
      //we set key and data because in redis when we want to set a key with more than one field value key and a data which is json :
      await this.#redis.hset(key, data);
      if (ex > 0) {
        await this.#redis.expire(key, ex);
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  //Function to use hgetall method in redis :
  async getHash(key) {
    try {
      return await this.#redis.hgetall(key);
    } catch (e) {
      return {};
    }
  }
  //Function to use hdel in redis :
  async delHash(key, ...field) {
    try {
      await this.#redis.hdel(key, field);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Redis;
