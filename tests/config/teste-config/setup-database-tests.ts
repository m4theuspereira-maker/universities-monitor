import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let databaseConnection: mongoose.Connection;

export async function startDatabase() {
  try {
    const mongooseDatabse = await MongoMemoryServer.create();
    const uri = mongooseDatabse.getUri();
    const { connection } = await mongoose.connect(uri);
    databaseConnection = connection;
  } catch (error) {
    console.log(String(error));
  }
}

export async function dropDatabase() {
  await databaseConnection.dropDatabase();
}
