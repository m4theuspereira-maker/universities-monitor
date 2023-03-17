import axios from "axios";
import { UniversityModel } from "../infra/database/mongodb/models/university-model";
import { UniversityRepository } from "../infra/reposiroties/university-repository";
import { ScheduleService } from "../services/schedule-services";
import { UniversityServices } from "../services/university-services";

export function scheduleServiceFactories(): ScheduleService {
  return new ScheduleService(
    axios,
    new UniversityServices(new UniversityRepository(UniversityModel))
  );
}
