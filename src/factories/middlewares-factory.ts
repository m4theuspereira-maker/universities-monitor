import { AuthenticationMiddlewares } from "../middlewares/authentication-middlewares";
import { EncryptionServices } from "../services/encryption-services";

export function middlewaresFactory(): AuthenticationMiddlewares {
  return new AuthenticationMiddlewares(new EncryptionServices());
}
