import { Router } from "express";
import userController from "../Controllers/userController.js";
import RateLimit from "../Middleware/rateLimit.js";
import AuthMiddleware from "../Middleware/auth.js";

const route = Router();

route.post("/register",new RateLimit("user_register", 2, 60, 60).handle ,userController.userRegister);
route.post("/login",new RateLimit("user_login", 3, 60, 60).handle ,userController.userLogin);
route.get("/profile",new AuthMiddleware().isAuth, userController.userProfile)  //we don't use rate limit for profile , because when we use it there will be problems on navigating for public and private routes.
route.post("/refresh-token", new RateLimit("user_login", 3, 60, 60).handle ,userController.userRefreshToken);

route.get("/logout",userController.userLogout);

route.post("/forgot", new RateLimit("user_login", 3, 60, 60).handle ,userController.userForgotPassword);
route.post("/change", userController.userChangePassword);

export default route;
