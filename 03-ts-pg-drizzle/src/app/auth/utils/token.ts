import jwt from "jsonwebtoken";
import { decode } from "node:punycode";

export interface UserTokenPayload {
  id: string;
}

const JWT_SECRET = "myjwtsecret";

export function createUserToken(payload: UserTokenPayload) {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}
export function VerifyUserToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
