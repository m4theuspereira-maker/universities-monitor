import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/environment-consts";
import { unauthorizedError } from "../controllers/handlers/handlers";
import { EncryptionServices } from "../services/encryption-services";

export class AuthenticationMiddlewares {
  constructor(private readonly encryptionService: EncryptionServices) {}

  requireAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers as any;

      if (!authorization) {
        return unauthorizedError(res, "no token provided");
      }

      const [, token] = authorization.split(" ");

      this.encryptionService.verifyEncryptedToken(token);
      next();
    } catch (error) {
      return unauthorizedError(res, "invalid token has been provided");
    }
  };
}
