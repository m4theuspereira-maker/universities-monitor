import { InternalServerErrorExpection } from "../infra/errors/erros";
import { UniversityServices } from "./university-services";
import cron from "node-cron";
import { AxiosAdapter } from "./adapters/adapters";
import { UniversityRepository } from "../infra/reposiroties/university-repository";
import { COUNTRIES_UNIVERSITIES_TO_BE_TAKEN } from "../config/environment-consts";

interface IUniversity {
  "state-province": string | null;
  domains: string[];
  country: string;
  web_pages: string[];
  name: string;
  alpha_two_code: string;
}

export class ScheduleService {
  constructor(
    private readonly axios: AxiosAdapter,
    private readonly universityService: UniversityServices
  ) {}

  async scheduleJob(): Promise<void> {
    try {
      // cron.schedule("", async () => {
      //   const universitiesFound = await axios.get(
      //     "http://universities.hipolabs.com/search?country=uruguay"
      //   );
      // });

      // const { data } = await this.axios(
      //   "http://universities.hipolabs.com/search?country=uruguay"
      // );

      // const universitiesMapped = data.map((university: IUniversity) => {
      //   return {
      //     state_province: university["state-province"],
      //     ...university
      //   };
      // });

      // console.log(universitiesMapped);

      await this.getUniversitiesByCountry(COUNTRIES_UNIVERSITIES_TO_BE_TAKEN);
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async getUniversitiesByCountry(countries: string[]): Promise<any> {
    let count = 0;
    let universities = [];
    return new Promise((resolve) => {
      const result = setInterval(async () => {
        const universitiesReponse = await this.axios(
          `http://universities.hipolabs.com/search?country=${countries[count]}`
        );

        const { data } = universitiesReponse;

        const universitiesMapped = data.map((university: IUniversity) => {
          return {
            state_province: university["state-province"],
            ...university
          };
        });

        if (universitiesMapped.length > 0) {
          await this.universityService.upserMany(universitiesMapped);
        }
        count++;

        if (count >= countries.length) {
          clearInterval(result);
        }
        return resolve({});
      }, 5000);
    });
  }
}
