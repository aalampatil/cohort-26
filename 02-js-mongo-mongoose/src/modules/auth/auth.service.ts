import ApiError from "../../common/utils/api-error.js";
import {
  sendForgotPasswordMail,
  sendVerificationMail,
} from "../../common/utils/email.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  hashToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.token.js";
import User, { type IUser } from "./auth.model.js";

const register = async ({ name, email, password, role }: IUser) => {
  //controller mei no logic
  // business logic only inthe service
  console.log("service line 15", name, email, password, role);
  const exist = await User.findOne({ email });
  if (exist) {
    throw ApiError.Conflict("user with this email already exists");
  }

  const { rawToken, hashed } = generateResetToken();
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashed,
  });

  //send an email to user with token
  try {
    console.log("rt", rawToken);
    await sendVerificationMail({ email, rawToken });
  } catch (error) {
    console.error(error);
  }

  const userObj = user.toObject();

  delete userObj.verificationToken;
  (userObj._id as any) = userObj._id.toString();
  return userObj;
};

const login = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorised("invalid email/password");

  const match = await user.isPasswordCorrect(password);
  if (!match) throw ApiError.unauthorised("incorrect password");
  if (!user.isVerified) throw ApiError.forbidden("not verfied");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  const { hashed } = hashToken(refreshToken);
  user.refreshToken = hashed;
  await user.save({ validateBeforeSave: false });
  const userObj = user.toObject();

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token: string) => {
  if (!token) throw ApiError.unauthorisedRequest("unauthorised");

  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorisedRequest("user not found");

  const { hashed } = hashToken(token);
  if (user.refreshToken !== hashed) {
    throw ApiError.unauthorisedRequest("invalid request");
  }

  // Generate new access token
  const accessToken = generateAccessToken({ id: user._id, role: user.role });

  // Generate new refresh token
  const newRefreshToken = generateRefreshToken({ id: user._id }); // you need this function
  const { hashed: hashedRefresh } = hashToken(newRefreshToken);

  // Update user's refresh token in DB
  user.refreshToken = hashedRefresh;
  await user.save({ validateBeforeSave: false });

  // Return tokens
  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: user.toObject(), // optional, if you want to send user info
  };
};

const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null }); //null bhi ho sakta hao

  return { message: "logged out" };
};

const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notfound("user with this email not found");

  const { rawToken, hashed } = generateResetToken();
  user.resetPasswordToken = hashed;
  user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;

  await user.save();
  //todo mail bhejna nahi aaaaaaaaaaaaaaaaaaaaata
  try {
    await sendForgotPasswordMail({ email, rawToken });
  } catch (error) {
    throw new Error("Failed to send email");
  }
  return { message: "password reset 200" };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notfound("user not found");
  return user;
};

const verifyEmail = async (token: string) => {
  console.log(token);
  if (!token) throw ApiError.unauthorised("token not found");

  const { hashed } = hashToken(token);

  const user = await User.findOne({ verificationToken: hashed }).select(
    "+verificationToken",
  );

  if (!user) throw ApiError.notfound("invalid token");
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save({ validateBeforeSave: false });
  return user;
};

const resetPassword = async (token: string, newPassword: string) => {
  const { hashed } = hashToken(token);

  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw ApiError.badRequest("Token invalid or expired");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;

  await user.save();

  return { message: "Password reset successful" };
};

export {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  getMe,
  verifyEmail,
  resetPassword,
};
