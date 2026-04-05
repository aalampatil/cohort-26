import "express";
type Role = "customer" | "seller" | "admin";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      role: string;
      name: string;
      email: string;
      role: Role;
    };
  }
}
