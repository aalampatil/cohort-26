import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
  role?: string;
}

const generateAccessToken = (payload: string | object | Buffer): string => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET as Secret;
  const expiry =
    (process.env.JWT_ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"]) || "15m";

  return jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
};

const generateRefreshToken = (payload: string | object | Buffer): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET as Secret, {
    expiresIn:
      (process.env.JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"]) ||
      "1d",
  });
};

const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET!,
  ) as TokenPayload;
};

const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
  ) as TokenPayload;
};

const generateResetToken = (): { rawToken: string; hashed: string } => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, hashed };
};

export const hashToken = (token: string): { hashed: string } => {
  const hashed = crypto.createHash("sha256").update(token).digest("hex");
  return { hashed };
};

export {
  generateResetToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
