import mongoose from "mongoose";
import { DATABASE_URL } from "../../../../config/environment-consts";

console.log(DATABASE_URL);

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
