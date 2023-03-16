import mongoose, { ObjectId } from "mongoose";
import { IUserModel, User } from "../database/mongodb/models/user-model";
import { InternalServerErrorExpection } from "../errors/erros";
import { IFindUserDto, IReposiroty } from "./interfaces/repository-interfaces";

export class UserRepository implements IReposiroty {
  constructor(private readonly userModel: mongoose.Model<IUserModel>) {}

  async save(user: User): Promise<IUserModel> {
    try {
      return (await this.userModel.create(user)).save();
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }

  findOne(userDto: IFindUserDto): Promise<IUserModel | null> {
    try {
      let findUserInput = { ...userDto } as any;

      if (userDto._id) {
        findUserInput._id = new mongoose.Types.ObjectId(userDto._id);
      }

      return this.userModel.findOne(findUserInput);
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }
  update(id: string, updatePayload: any): Promise<any> {
    try {
      return this.userModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { updated_at: new Date(), ...updatePayload },
        { new: true }
      );
    } catch (error) {
      throw new InternalServerErrorExpection();
    }
  }
}
