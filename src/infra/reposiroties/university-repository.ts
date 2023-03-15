import mongoose from "mongoose";
import {
  IUniversityModel,
  University
} from "../database/mongodb/models/university-model";
import { IReposiroty } from "./interfaces/repository-interfaces";

export class UniversityRepository implements IReposiroty {
  constructor(
    private readonly universityModel: mongoose.Model<IUniversityModel>
  ) {}
  async findOne(id: string): Promise<IUniversityModel | null> {
    try {
      return this.universityModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        deleted_at: null
      });
    } catch (error) {
      throw new Error();
    }
  }
  async save(university: University): Promise<IUniversityModel> {
    try {
      return (await this.universityModel.create(university)).save();
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async saveMany(universities: University[]): Promise<IUniversityModel[]> {
    try {
      const universitiesWithObjectId = universities.map(
        (university) =>
          (university = { _id: new mongoose.Types.ObjectId(), ...university })
      );
      return this.universityModel.insertMany(universitiesWithObjectId);
    } catch (error) {
      throw new Error();
    }
  }

  async findMany(
    filter: any,
    limit: number,
    offset: number
  ): Promise<IUniversityModel[]> {
    try {
      const universities = await this.universityModel
        .find(filter)
        .limit(limit)
        .skip(offset);

      if (!universities.length) {
        return universities;
      }

      return universities.filter((university: any) => !university.deleted_at);
    } catch (error) {
      throw new Error();
    }
  }

  async update(id: string, updatePayload: any): Promise<any | null> {
    try {
      return this.universityModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { updated_at: new Date(), ...updatePayload },
        { new: true }
      );
    } catch (error) {
      throw new Error();
    }
  }
}
