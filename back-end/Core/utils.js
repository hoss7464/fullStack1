import dotenv from "dotenv";
import dorenvExpand from "dotenv-expand";
import process from "process"


const env = dotenv.config();
dorenvExpand.expand(env);

//utile funcion to get env parameters :
export const getEnv = (key, cast = "string") => {
  let ret = "";

  switch (cast) {
    case "number":
      ret = toNumber(process.env[key]);
      break;
    case "bool":
      ret = process.env[key] === "true" ? true : false;
      break;
    default:
      ret = process.env[key] ?? "";
      break;
  }
  return ret ?? "";
};

//utile function to return a number
export const toNumber = (item) => {
  try {
    const numberItem = Number(item);
    return isNaN(numberItem) ? 0 : numberItem;
  } catch (e) {
    return 0;
  }
};

//Function to make a delay somewhere :
export const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

//Function to make random number between two numbers :
export const random = (min, max) => {
  try {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } catch (e) {
    return 0;
  }
};

//Function to convert json into object :
export const stringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return "";
  }
};

//Function to Parse json and return json obg
export const toJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

//Function to recognize if str is json or not:
export const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

//Function to get string and returns objectId :
export const toObjectId = (str) => {
  try {
    if (!str) return null;
    if (mongoose.Types.ObjectId.isValid(str)) {
      return new mongoose.Types.ObjectId(str);  // Note the 'new' keyword
    }
    return null;
  } catch (e) {
    log('toObjectId error:', e);
    return null;
  }
};