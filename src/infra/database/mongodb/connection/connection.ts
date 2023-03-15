import mongoose from "mongoose";
import { DATABASE_URL } from "../../../../config/environment-consts";

export function connectToDatabase() {
  mongoose
    .connect(DATABASE_URL as string)
    .then(() => {
      console.log(`database connected 💾`);
    })
    .catch(() => {
      console.log(`error to connect database ❌`);
    });
}
