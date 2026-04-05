import { Router } from "express";
import { validate } from "../../common/middlewares/validate.middleware.js";
import * as controller from "./auth.controller.js";
import { isAuthenticated } from "./auth.middlewares.js";
import RegisterDTO from "./dto/register.dto.js";
import LoginDTO from "./dto/login.dto.js";
import ForgotPasswordDTO from "./dto/forgot.dto.js";
import ResetPasswordDTO from "./dto/resetPassword.dto.js";

const authRouter = Router();

authRouter.route("/register").post(validate(RegisterDTO), controller.register);
authRouter.route("/login").post(validate(LoginDTO), controller.login);
authRouter.route("/refresh").post(isAuthenticated, controller.refresh);
authRouter.route("/logout").post(isAuthenticated, controller.logout);
authRouter
  .route("/forgot-password")
  .post(validate(ForgotPasswordDTO), controller.forgotPassword);
authRouter.route("/me").get(isAuthenticated, controller.getMe);
authRouter.route("/verify-email/:token").get(controller.verifyEmail);
authRouter
  .route("/reset-password/:token")
  .post(validate(ResetPasswordDTO), controller.resetPassword);

export default authRouter;
