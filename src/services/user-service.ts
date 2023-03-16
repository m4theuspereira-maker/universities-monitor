import {
  IUserDto,
  IUserModel,
  User
} from "../infra/database/mongodb/models/user-model";
import { InternalServerErrorExpection } from "../infra/errors/erros";
import { UserRepository } from "../infra/reposiroties/user-repository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/environment-consts";
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({ username, password }: User) {
    try {
      const passwordHash = await bcrypt.hash(password, 8);

      return await this.userRepository.save({
        username,
        password: passwordHash
      });
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async login({ username, password }: User) {
    try {
      const userFound = (await this.userRepository.findOne({
        username
      })) as unknown as User;

      if (!userFound) {
        return null;
      }

      const validPasword = await bcrypt.compare(password, userFound.password);

      if (!validPasword) {
        return null;
      }

      const token = jwt.sign({ username, password }, APP_SECRET as string, {
        expiresIn: "1d"
      });

      return { username, password, token };
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async resetPassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ) {
    try {
      const userFound = (await this.userRepository.findOne({
        username
      })) as unknown as IUserDto;

      if (!userFound) {
        return null;
      }

      const validPasword = await bcrypt.compare(
        oldPassword,
        userFound.password!
      );

      if (!validPasword) {
        return null;
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 8);

      const userUpdated = await this.userRepository.update(userFound._id!, {
        password: newPasswordHashed
      });

      if (!userUpdated) {
        return null;
      }

      const token = jwt.sign(
        { username, password: newPassword },
        APP_SECRET as string,
        {
          expiresIn: "1d"
        }
      );

      return { ...userUpdated._doc, token };
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }
}
