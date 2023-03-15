import express from "express";
import cors from "cors";
import { PORT } from "./config/environment-consts";
import { connectToDatabase } from "./infra/database/mongodb/connection/connection";
const app = express();
app.use(cors());

const server = app.listen(PORT, () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  connectToDatabase();
  console.log(`listening on port ${PORT} 🚀`);
});

export { server };
