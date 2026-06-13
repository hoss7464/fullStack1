import BaseMiddleware from "../Core/BaseMiddleware.js";
import { getEnv } from "../Core/utils.js";

class CORSMiddleware extends BaseMiddleware {
  constructor() {
    super();
  }

  async handle(app, res, next) {
    try {
      const ALLOW_ORIGIN = getEnv("ALLOW_ORIGIN").split(",");
      const reqORIGIN = req.headers.origin ?? "";
      console.log(ALLOW_ORIGIN);
      if (reqORIGIN !== "") {
        const origin = ALLOW_ORIGIN.findIndex((value) => value === reqORIGIN);
        if (origin >= 0) {
          res.set({
            "Access-Control-Allow-Origin": ALLOW_ORIGIN(origin),
            "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,X-Token",
          });
        }
      }
      next();
    } catch (e) {
      next();
    }
  }
}

export default CORSMiddleware
