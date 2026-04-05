import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.token.js";
import User, { type IUser } from "./auth.model.js";
import type { Request, Response, NextFunction } from "express";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw ApiError.unauthorised("not authorised");

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id);
  if (!user) throw ApiError.unauthorised("user doesn't exist");
  req.user = {
    id: user._id.toString(),
    role: user.role,
    name: user.name,
    email: user.email,
  };
  next();
};

type Role = "customer" | "seller" | "admin";

const authorise = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role as Role)) {
      throw ApiError.forbidden(
        "you do not have permission to perfrom this action",
      );
    }
    next();
  };
};

export { isAuthenticated, authorise };
