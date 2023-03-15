import { DEFAULT_PAGE_LIMIT } from "../config/environment-consts";
import { InternalServerErrorExpection } from "../infra/database/errors/erros";
import { University } from "../infra/database/mongodb/models/university-model";
import { UniversityRepository } from "../infra/reposiroties/university-repository";

export class UniversityServices {
  constructor(private readonly universityrepository: UniversityRepository) {}

  async createUniversity(university: University) {
    try {
      return this.universityrepository.save(university);
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async deleteUniversity(id: string): Promise<any> {
    try {
      return await this.universityrepository.update(id, {
        deleted_at: new Date()
      });
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async updateUniversity(id: string, updatePayload: any) {
    try {
      return this.universityrepository.update(id, updatePayload);
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async findOneUniversity(id: string) {
    try {
      return this.universityrepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  async findMany(page: number, country?: string) {
    try {
      const pageoffset = (page - 1) * DEFAULT_PAGE_LIMIT;

      return await this.universityrepository.findMany(
        { country },
        DEFAULT_PAGE_LIMIT,
        pageoffset
      );
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }
}
