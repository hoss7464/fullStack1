import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import CORSMiddleware from "./Middleware/cors.js";
import { Redis } from "./global.js";
import MongoDB from "./Core/mongoDB.js";
import { getEnv } from "./Core/utils.js";
import swaggerUi from "swagger-ui-express";
import swagger from "./Core/swgger.js";


class Application {
  #app = null;

  async #intiExpress(req, res) {
    try {
      //to initiate express
      this.#app = express();
      //To enable json file :
      this.#app.use(express.json({ limit: "10mb" }));
      //to allow express to have POST, PUT, PATCH :
      this.#app.use(express.urlencoded({ extended: true, limit: "10mb" }));
      //cookie parser middleware : (cookie parser must be before CORS middleware and routes)
      this.#app.use(cookieParser())
      //cors middleware :
      this.#app.use(new CORSMiddleware().handle)
      //swagger :
      if (getEnv("DEBUG", "bool")) {
        this.#app.use(
          getEnv("SWAGGER_ROUTE"),
          swaggerUi.serve,
          swaggerUi.setup(swagger),
        );
      }
    } catch (e) {
      console.log(`Error on initExpress : ${e.toString()} `);
    }
  }

  async #initRoutes() {
    try {
      const { default: mainRoute } = await import("./Routes/mainRoutes.js");
      this.#app.use("/", mainRoute);
    } catch (e) {
      console.log(`Error on initRoutes : ${e.toString()} `);
    }
  }

  async #init() {
    const redisStatus = await Redis.connect(getEnv("REDIS_URI"));
    if (!redisStatus) {
      console.log("Redis can not connect!!!!!");
      process.exit(-1);
    }

   // await Redis.set("q100", {"fName" : "hossein", "lName" : "fathollahi"})

    const mongodbStatus = await MongoDB.connect(getEnv("MONGODB_URI"));
    if (!mongodbStatus) {
      console.log("MongoDB database con not connect!!!!!!!");
      process.exit(-1);
    }

    await this.#intiExpress();
    await this.#initRoutes();
  }

  async run() {
    try {
      await this.#init();
      //set port to 4000
      const port = 4000;
      this.#app.listen(port, async () => {
        console.log(`App is listening to port ${port}`);
      });
    } catch (e) {
      console.log(`Error on run : ${e.toString()} `);
    }
  }
}

export default Application;
