import {
  dropDatabase,
  startDatabase
} from "../../../../config/teste-config/setup-database-tests";
import { UniversityRepository } from "../../../../../src/infra/reposiroties/university-repository";
import { UniversityModel } from "../../../../../src/infra/database/mongodb/models/university-model";

describe("UniversityReposiroty", () => {
  let universityRepository: UniversityRepository;

  beforeAll(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  describe("saveUniversity", () => {
    it("should save university", async () => {
      const universityModel = UniversityModel;

      universityRepository = new UniversityRepository(universityModel);

      const universitySaved = await universityRepository.save({
        domains: ["claeh.edu.uy"],
        country: "Uruguay",
        web_pages: ["http://www.claeh.edu.uy/"],
        name: "Insituto Universitario - Centro Latinoamericano de Economia Humana - IU Claeh",
        alpha_two_code: "UY"
      });

      expect(universitySaved instanceof UniversityModel).toBeTruthy();
    });
  });
});
