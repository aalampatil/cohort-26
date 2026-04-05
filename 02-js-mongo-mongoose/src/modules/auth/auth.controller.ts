import * as authService from "./auth.service.js";
import type { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/api-response.js";
import ApiError from "../../common/utils/api-error.js";

const register = async (req: Request, res: Response) => {
  const response = await authService.register(req.body);
  ApiResponse.created(res, "user registered", response);
};

const login = async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body);
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  ApiResponse.ok(res, "logged in", { user, accessToken });
};

const logout = async (req: Request, res: Response) => {
  await authService.logout(req.user.id);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "logged out", null);
};

const forgotPassword = async (req: Request, res: Response) => {
  const response = await authService.forgotPassword(req.user.email);
  ApiResponse.ok(res, "ook 200", response);
};

const refresh = async (req: Request, res: Response) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw ApiError.unauthorised("refresh token missing");
  }
  const response = await authService.refresh(token);
  ApiResponse.ok(res, "token refreshed", response);
};

const getMe = async (req: Request, res: Response) => {
  const response = await authService.getMe(req.user.id);
  ApiResponse.ok(res, "fetched successfully", response);
};

const verifyEmail = async (req: Request, res: Response) => {
  const { token }: any = req.params;

  if (!token) {
    throw ApiError.unauthorised("Invalid token");
  }

  const response = await authService.verifyEmail(token);

  return ApiResponse.ok(res, "Verified", response);
};

const resetPassword = async (req: Request, res: Response) => {
  const { token }: any = req.params;
  const { newPassword } = req.body;

  if (!token) {
    throw ApiError.unauthorised("Invalid token");
  }

  const response = await authService.resetPassword(token, newPassword);

  return ApiResponse.ok(res, "Verified", response);
};

export {
  register,
  login,
  forgotPassword,
  refresh,
  logout,
  getMe,
  verifyEmail,
  resetPassword,
};
