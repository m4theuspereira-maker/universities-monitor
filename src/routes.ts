import express, { Router } from "express";
import { universitiesControllerFactory } from "./factories/controller-factories";

const universityController = universitiesControllerFactory();

const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

routes.post("/universities", universityController.createUniversity);
routes.get("/universities", universityController.getUniversities);
routes.get(
  "/universities/:universityId",
  universityController.getUniversityById
);
routes.put(
  "/universities/:universityToBeUpdatedId",
  universityController.updateUniversity
);
routes.delete(
  "/universities/:universityToBeDeletedId",
  universityController.deleteUniversity
);

export { routes };
