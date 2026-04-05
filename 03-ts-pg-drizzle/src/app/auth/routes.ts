import express, { type Router } from "express";
import { AuthenticationController } from "./controller.js";
import {
  authenticationMiddleware,
  restrictToAuthenticated,
} from "../middleware/auth-middleware.js";

export const authRouter: Router = express.Router();

const authController = new AuthenticationController();

authRouter.post("/sign-up", authController.handleSignUp.bind(authController));
authRouter.post("/sign-in", authController.handleSignIn.bind(authController));
authRouter.get(
  "/me",
  restrictToAuthenticated(),
  authController.handleMe.bind(authController),
);
