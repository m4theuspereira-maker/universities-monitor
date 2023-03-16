import { Types, Document, Schema, model } from "mongoose";

export interface User {
  username: string;
  password: string;
}

export interface IUserDto {
  _id?:string,
  username?:string,
  password?: string,
}

export interface IUserModel extends Document<User> {}

export const userSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
    required: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    required: true,
    default: new Date()
  },
  updated_at: {
    type: Date,
    required: false,
    default: null
  },
  deleted_at: {
    type: Date,
    required: false,
    default: null
  }
});

export const UserModel = model<IUserModel>("user", userSchema);
