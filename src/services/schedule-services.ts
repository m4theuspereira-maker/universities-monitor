import { InternalServerErrorExpection } from "../infra/errors/erros";
import { UniversityServices } from "./university-services";
import cron from "node-cron";
import { AxiosAdapter } from "./adapters/adapters";
import { COUNTRIES_UNIVERSITIES_TO_BE_TAKEN } from "../config/environment-consts";
import {} from "node-cron";

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

  async scheduleJob(timeToSchedule: string): Promise<void> {
    try {
      console.log("começou");
      const task = cron.schedule(
        timeToSchedule,
        async () => {
          await this.getUniversitiesByCountry(
            COUNTRIES_UNIVERSITIES_TO_BE_TAKEN
          );
        },
        {
          scheduled: false,
          timezone: "America/Sao_Paulo"
        }
      );

      task.start();
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
        console.log(count);
        count++;

        if (count >= countries.length) {
          clearInterval(result);
        }
        return resolve({});
      }, 5000);
    });
  }
}
