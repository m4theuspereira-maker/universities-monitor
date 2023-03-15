import { Types, Document, Schema, model } from "mongoose";

export interface University {
  _id?: Types.ObjectId;
  state_province?: string;
  domains: string[];
  country: string;
  web_pages: string[];
  name: string;
  alpha_two_code: string;
}

export interface IUniversityModel extends Document<University> {}

const universitySchema = new Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
    required: false
  },
  state_province: { type: String, required: false, default: null },
  domains: { type: Array<String>, required: true },
  country: { type: String, required: true },
  web_pages: { type: Array<String>, required: true },
  name: { type: String, required: true },
  alpha_two_code: {
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

export const UniversityModel = model<IUniversityModel>(
  "university",
  universitySchema
);
