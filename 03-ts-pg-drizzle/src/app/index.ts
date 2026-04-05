import express, { type Request, type Response, type Express } from "express";
import { authRouter } from "./auth/routes.js";
import { authenticationMiddleware } from "./middleware/auth-middleware.js";

export function createExpressApplication(): Express {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(authenticationMiddleware());
  app.get("/", (req: Request, res: Response) => {
    return res.send("working");
  });

  app.use("/api/auth", authRouter);
  return app;
}
