import express from "express";
import cors from "cors";
import {
  PORT,
  SWAGGER_DOCS,
  TIME_TO_RUN_SCHEDULE
} from "./config/environment-consts";
import { routes } from "./routes";
import { connectToDatabase } from "./infra/database/mongodb/connection/connection";
import swaggerUi from "swagger-ui-express";
import { scheduleServiceFactories } from "./factories/service-factories";

const app = express();
app.use(routes);
const server = app.listen(PORT, async () => {
  app.use(cors());
  app.use("/api", swaggerUi.serve, swaggerUi.setup(SWAGGER_DOCS));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  connectToDatabase();
  await scheduleServiceFactories().scheduleJob(TIME_TO_RUN_SCHEDULE);
  console.log(`listening on port ${PORT} 🚀`);
});

export { server };
