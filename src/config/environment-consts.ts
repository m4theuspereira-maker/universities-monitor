import { resolve } from "path";
import { config } from "dotenv";
import swaggerDocs from "./swagger.json";

config({ path: resolve(__dirname, "../../.env") });

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DEFAULT_PAGE_LIMIT = 20;
export const SWAGGER_DOCS = swaggerDocs;
export const APP_SECRET = process.env.APP_SECRET;
export const COUNTRIES_UNIVERSITIES_TO_BE_TAKEN = [
  "argentina",
  "brazil",
  "chile",
  "colombia",
  "paraguai",
  "peru",
  "suriname",
  "uruguay"
];
export const TIME_TO_RUN_SCHEDULE = "00 */24 * * *";
