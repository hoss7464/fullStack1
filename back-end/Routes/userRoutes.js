import { Router } from "express";
import userController from "../Controllers/userController.js";
import RateLimit from "../Middleware/rateLimit.js";
import AuthMiddleware from "../Middleware/auth.js";

const route = Router();

route.post("/register",new RateLimit("user_register", 2, 60, 60).handle ,userController.userRegister);
route.post("/login",new RateLimit("user_login", 3, 60, 60).handle ,userController.userLogin);
route.get("/profile", new RateLimit("user_login", 3, 60, 60).handle,new AuthMiddleware().isAuth, userController.userProfile)
route.post("/refresh-token", new RateLimit("user_login", 3, 60, 60).handle ,userController.userRefreshToken);

route.get("/logout",new AuthMiddleware().isAuth ,userController.userLogout);

route.post("/forgot", new RateLimit("user_login", 3, 60, 60).handle ,userController.userForgotPassword);
route.post("/change", userController.userChangePassword);

export default route;
