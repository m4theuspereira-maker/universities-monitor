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
  findOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async save(university: University): Promise<any> {
    try {
      return (await this.universityModel.create(university)).save();
    } catch (error) {
      new Error();
    }
  }
}
