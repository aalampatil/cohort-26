import ApiError from "../utils/api-error.js";
import type { Request, Response, NextFunction } from "express";
import BaseDTO from "../dto/dto.js";
import { ArkErrors } from "arktype";

export const validate =
  (DTO: typeof BaseDTO) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const schema = DTO.schema;
    const result = schema(req.body);
    //console.log(result);

    if (result instanceof ArkErrors) {
      throw ApiError.badRequest(result.toString());
    }

    req.body = result;
    // console.log(req.body);
    next();
  };
