import { DEFAULT_PAGE_LIMIT } from "../config/environment-consts";
import { University } from "../infra/database/mongodb/models/university-model";
import { UniversityRepository } from "../infra/reposiroties/university-repository";

export class UniversityServices {
  constructor(private readonly universityrepository: UniversityRepository) {}

  async createUniversity(university: University): Promise<any> {
    return this.universityrepository.save(university);
  }

  async deleteUniversity(id: string): Promise<any> {
    return await this.universityrepository.update(id, {
      deleted_at: new Date()
    });
  }

  async updateUniversity(id: string, updatePayload: any) {
    return this.universityrepository.update(id, updatePayload);
  }

  async findOneUniversity(id: string) {
    return this.universityrepository.findOne(id);
  }

  async findMany(page: number, country?: string) {
    const pageoffset = (page - 1) * DEFAULT_PAGE_LIMIT;

    return await this.universityrepository.findMany(
      { country },
      DEFAULT_PAGE_LIMIT,
      pageoffset
    );
  }
}
