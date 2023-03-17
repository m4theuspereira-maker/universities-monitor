import { Response, Request } from "express";
import { User } from "../infra/database/mongodb/models/user-model";
import { UserServices } from "../services/user-services";
import {
  badrequestError,
  ok,
  serverError,
  unauthorizedError
} from "./handlers/handlers";

export class UserController {
  constructor(private readonly userService: UserServices) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, repeat_password } = req.body;

      if (password !== repeat_password) {
        return badrequestError(res, "password and repeat should be equal");
      }

      const userCreated = await this.userService.createUser({
        username,
        password
      });

      return ok(res, userCreated);
    } catch (error) {
      return serverError(res, error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const userLogged = await this.userService.login({
        username,
        password
      });

      if (!userLogged) {
        return unauthorizedError(res, "username or password invalid");
      }

      return ok(res, userLogged);
    } catch (error) {
      return serverError(res, error);
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { username, old_password, new_password } = req.body;

      const userLogged = await this.userService.resetPassword(
        username,
        old_password,
        new_password
      );

      if (!userLogged) {
        return unauthorizedError(res, "username or password invalid");
      }

      return ok(res, userLogged);
    } catch (error) {
      return serverError(res, error);
    }
  };
}
