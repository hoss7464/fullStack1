import autoBind from "auto-bind";
import { getEnv } from "./utils.js";

export default class BaseMiddleware {
  constructor() {
    if (this.constructor === BaseMiddleware) {
      throw new Error(
        `BaseMiddleware is an abstract class and can't be instance!`,
      );
    }
    autoBind(this);
  }

  toError(error, req, res) {
    try {
      //error reporting :
      if (getEnv("DEBUG", "bool")) {
        return res.status(500).send(error.toString());
      } else {
        return res.status(500).send("Internal Server Error!");
      }
    } catch (e) {
      if (getEnv("DEBUG", "bool")) {
        return res.status(500).send(e.toString());
      } else {
        return res.status(500).send("Internal Server Error!");
      }
    }
  }
}
