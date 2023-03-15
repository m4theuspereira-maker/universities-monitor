import { UniversityController } from "../controllers/university-controller";
import { UniversityModel } from "../infra/database/mongodb/models/university-model";
import { UniversityRepository } from "../infra/reposiroties/university-repository";
import { UniversityServices } from "../services/university-services";

export function universitiesControllerFactory(): UniversityController {
  const universityRepository = new UniversityRepository(UniversityModel);
  const unversityService = new UniversityServices(universityRepository);
  return new UniversityController(unversityService);
}
