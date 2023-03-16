import { UniversityController } from "../controllers/university-controller";
import { UserController } from "../controllers/user-controller";
import { UniversityModel } from "../infra/database/mongodb/models/university-model";
import { UserModel } from "../infra/database/mongodb/models/user-model";
import { UniversityRepository } from "../infra/reposiroties/university-repository";
import { UserRepository } from "../infra/reposiroties/user-repository";
import { UniversityServices } from "../services/university-services";
import { UserService } from "../services/user-service";

export function universitiesControllerFactory(): UniversityController {
  const universityRepository = new UniversityRepository(UniversityModel);
  const unversityService = new UniversityServices(universityRepository);
  return new UniversityController(unversityService);
}


export function userControllerFactory ():UserController{
  const userRepository = new UserRepository(UserModel)
  const userService = new UserService(userRepository)
  return new UserController(userService)
}

