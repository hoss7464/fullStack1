import { Router } from "express";
import registerRoute from "./userRoutes.js";

const route = Router();

route.get("/", (req, res) => res.send("Welcome to the root route!"));
route.use("/user", registerRoute);

export default route;
