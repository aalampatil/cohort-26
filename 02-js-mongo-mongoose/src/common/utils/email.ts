import { Type } from "arktype";
import nodemailer from "nodemailer";
//development mail service - mailtrap
//production mail service - resend

// Create a transporter using SMTP

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (
  to: string,
  subject: string,
  text?: string,
  html?: string,
) => {
  const result = await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject,
    text,
    html,
  });
  return result;
};

type VerificationMailInput = {
  email: string;
  rawToken: string;
};

export const sendVerificationMail = async ({
  email,
  rawToken,
}: VerificationMailInput) => {
  const verifyUrl = `http://localhost:5000/api/verify-email/${rawToken}`;

  try {
    const info = await sendMail(
      email,
      "Verify your email",
      undefined,
      `
        <h2>Email Verification</h2>
        <p>Click below to verify your account:</p>
        <a href="${verifyUrl}">Verify Email</a>
      `,
    );

    console.log("mail sent", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

type ForgotPasswordMailInput = {
  email: string;
  rawToken: string;
};

export const sendForgotPasswordMail = async ({
  email,
  rawToken,
}: ForgotPasswordMailInput) => {
  const url = `http://localhost:5000/api/reset-password/${rawToken}`;

  try {
    const info = await sendMail(
      email,
      "Reset Your Password",
      undefined,
      `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${url}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
    );

    console.log("mail sent", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
