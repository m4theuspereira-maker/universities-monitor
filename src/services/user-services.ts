import { IUserDto, User } from "../infra/database/mongodb/models/user-model";
import { InternalServerErrorExpection } from "../infra/errors/erros";
import { UserRepository } from "../infra/reposiroties/user-repository";
import { EncryptionServices } from "./encryption-services";

export class UserServices {
  constructor(
    private readonly userRepository: UserRepository,
    private encryptionService: EncryptionServices
  ) {}

  async createUser({ username, password }: User) {
    try {
      const userFound = await this.userRepository.findOne({ username });

      if (userFound) {
        return null;
      }

      const passwordHash = await this.encryptionService.hashPassword(password);

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

      const validPaswordHashed = await this.encryptionService.validatePassword(
        password,
        userFound.password
      );

      if (!validPaswordHashed) {
        return null;
      }

      const token = this.encryptionService.encryptToken(username, password);

      return { username, password: validPaswordHashed, token };
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

      const validPasword = await this.encryptionService.validatePassword(
        oldPassword,
        userFound.password!
      );

      if (!validPasword) {
        return null;
      }

      const newPasswordHashed = await this.encryptionService.hashPassword(
        newPassword
      );

      const userUpdated = await this.userRepository.update(userFound._id!, {
        password: newPasswordHashed
      });

      if (!userUpdated) {
        return null;
      }

      const token = this.encryptionService.encryptToken(username, newPassword);

      return { ...userUpdated._doc, token };
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }
}
