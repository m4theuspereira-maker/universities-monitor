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

export async function seedDatabase() {
  const universityCollection = databaseConnection.collection("university");
  await universityCollection.insertMany([
    {
      _id: new mongoose.Types.ObjectId("6411bfa34a3fe48129c3fbf5"),
      domains: ["claeh.edu.uy"],
      country: "Brasil",
      web_pages: ["http://www.claeh.edu.uy/"],
      name: "Insituto Universitario - Centro Latinoamericano de Economia Humana - IU Claeh",
      alpha_two_code: "BR"
    },
    {
      _id: new mongoose.Types.ObjectId("6411bfc2f38358d72cca9412"),
      state_province: "Buenos Aires",
      domains: ["austral.edu.ar"],
      country: "Argentina",
      web_pages: ["http://www.austral.edu.ar/"],
      name: "Universidad Austral Buenos Aires",
      alpha_two_code: "AR"
    }
  ]);
}

export async function dropDatabase() {
  await databaseConnection.dropDatabase();
}
