import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/environment-consts";
import { unauthorizedError } from "../controllers/handlers/handlers";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers as any;

    if (!authorization) {
      return unauthorizedError(res, "no token provided");
    }

    const [, token] = authorization.split(" ");

    jwt.verify(token, APP_SECRET as string);
    next();
  } catch (error) {
    return unauthorizedError(res, "invalid token has been provided");
  }
};
