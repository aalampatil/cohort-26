import type { Request, Response } from "express";
import { signinPayloadModel, signupPayloadModel } from "./models.js";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";
import { createUserToken, type UserTokenPayload } from "./utils/token.js";

const validate = async (model: any, body: any) => {
  return await model.safeParseAsync(body);
};

const hash = (salt: string, password: string): string => {
  return createHmac("sha256", salt).update(password).digest("hex");
};

export class AuthenticationController {
  public async handleSignUp(req: Request, res: Response) {
    //const validationResult = await signupPayloadModel.safeParseAsync(req.body);
    const validationResult = await validate(signupPayloadModel, req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "valiation failed, invalid data",
        error: validationResult.error.issues,
      });
    }

    const { firstName, email, password } = validationResult.data;

    const [exist] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (exist) {
      return res.status(400).json({
        error: "duplicate entry",
        message: `user with this email ${email} already exist`,
      });
    }

    const salt = randomBytes(32).toString("hex");
    const hashed = hash(salt, password);
    const [result] = await db
      .insert(usersTable)
      .values({
        firstName,
        email,
        password: hashed,
        salt,
      })
      .returning({ id: usersTable.id });

    return res
      .status(201)
      .json({ message: "user registered", date: { id: result?.id } });
  }

  public async handleSignIn(req: Request, res: Response) {
    const validationResult = await validate(signinPayloadModel, req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: "valiation failed, invalid data",
        error: validationResult.error.issues,
      });
    }

    const { email, password } = validationResult.data;

    const [userSelect] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!userSelect) {
      return res
        .status(404)
        .json({ message: `user with this email ${email} does not exist` });
    }

    const salt = userSelect.salt!;
    const hashed = hash(salt, password);
    if (hashed !== userSelect.password) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    //todo token
    const token = createUserToken({ id: userSelect.id });

    return res
      .status(201)
      .json({ message: "sign in success", data: { token } });
  }

  public async handleMe(req: Request, res: Response) {
    //@ts-ignore
    const { id } = req.user! as UserTokenPayload;

    const [userResult] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return res.status(201).json({
      firstName: userResult?.firstName,
      email: userResult?.email,
    });
  }
}
