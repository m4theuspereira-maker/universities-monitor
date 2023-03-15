import {
  dropDatabase,
  seedDatabase,
  startDatabase
} from "../../../../config/teste-config/setup-database-tests";
import { UniversityRepository } from "../../../../../src/infra/reposiroties/university-repository";
import {
  IUniversityModel,
  UniversityModel
} from "../../../../../src/infra/database/mongodb/models/university-model";

describe("UniversityReposiroty", () => {
  let universityRepository: UniversityRepository;
  const universityModel = UniversityModel;
  let universities: IUniversityModel[];

  beforeAll(async () => {
    await startDatabase();
    await seedDatabase();
    universityRepository = new UniversityRepository(universityModel);
  });

  afterAll(async () => {
    await dropDatabase();
  });

  describe("findOne", () => {
    it("should return an university", async () => {
      const universityFound = await universityRepository.findOne(
        "6411bfc2f38358d72cca9412"
      );
      expect(universityFound).toBeNull();
    });
  });

  describe("save", () => {
    it("should save university", async () => {
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

  describe("saveMany", () => {
    it("should return the saved array", async () => {
      const universitiesSaved = await universityRepository.saveMany([
        {
          domains: ["claeh.edu.uy"],
          country: "Brasil",
          web_pages: ["http://www.claeh.edu.uy/"],
          name: "Insituto Universitario - Centro Latinoamericano de Economia Humana - IU Claeh",
          alpha_two_code: "BR"
        },
        {
          state_province: "Buenos Aires",
          domains: ["austral.edu.ar"],
          country: "Argentina",
          web_pages: ["http://www.austral.edu.ar/"],
          name: "Universidad Austral Buenos Aires",
          alpha_two_code: "AR"
        }
      ]);

      expect(universitiesSaved).toHaveLength(2);
    });
  });

  describe("findMany", () => {
    it("should save university", async () => {
      universities = await universityRepository.findMany({}, 20, 0);

      expect(universities).toHaveLength(3);
    });
  });

  describe("update", () => {
    it("should save university", async () => {
      const univesityUpdated = await universityRepository.update(
        String(universities.at(0)?._id),
        { deleted_at: new Date() }
      );
      universities = await universityRepository.findMany({}, 20, 0);

      expect(univesityUpdated.deleted_at!).not.toBeNull();
      expect(universities).toHaveLength(2);
    });
  });

  describe("findOne", () => {
    it("should return an university", async () => {
      const universityFound = await universityRepository.findOne(
        String(universities.at(1)?._id)
      );
      expect(universityFound).not.toBeNull();
    });
  });
});
