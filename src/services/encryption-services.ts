import { InternalServerErrorExpection } from "../infra/errors/erros";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/environment-consts";

export class EncryptionServices {
  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 8);
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async validatePassword(
    password: string,
    userSavedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, userSavedPassword);
  }

  encryptToken(username: string, password: string): string {
    return jwt.sign({ username, password }, APP_SECRET as string, {
      expiresIn: "1d"
    });
  }

  verifyEncryptedToken(token: string): void {
    jwt.verify(token, APP_SECRET as string);
  }
}
