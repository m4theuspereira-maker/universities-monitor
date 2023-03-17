import { UniversityController } from "../controllers/university-controller";
import { UserController } from "../controllers/user-controller";
import { UniversityModel } from "../infra/database/mongodb/models/university-model";
import { UserModel } from "../infra/database/mongodb/models/user-model";
import { UniversityRepository } from "../infra/reposiroties/university-repository";
import { UserRepository } from "../infra/reposiroties/user-repository";
import { EncryptionServices } from "../services/encryption-services";
import { UniversityServices } from "../services/university-services";
import { UserServices } from "../services/user-services";

export function universitiesControllerFactory(): UniversityController {
  const universityRepository = new UniversityRepository(UniversityModel);
  const unversityService = new UniversityServices(universityRepository);
  return new UniversityController(unversityService);
}

export function userControllerFactory(): UserController {
  const userRepository = new UserRepository(UserModel);
  const encryptionService = new EncryptionServices();
  const userServices = new UserServices(userRepository, encryptionService);
  return new UserController(userServices);
}
