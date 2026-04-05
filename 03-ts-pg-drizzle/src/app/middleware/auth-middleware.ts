import type { Request, Response, NextFunction } from "express";
import { VerifyUserToken } from "../auth/utils/token.js";

export function authenticationMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return next();
    if (!header?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "authorization header must start with Bearer" });
    }

    const token = header.split(" ")[1];

    if (!token) return res.status(401).json({ error: "token missing" });

    const user = VerifyUserToken(token);
    console.log(user);

    // if (!user) return res.status(400).json({ error: "user not found" });

    //@ts-ignore
    req.user = user;
    next();
  };
}

export function restrictToAuthenticated() {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!req.user)
      return res.status(401).json({ error: "authentication required" });

    return next();
  };
}
