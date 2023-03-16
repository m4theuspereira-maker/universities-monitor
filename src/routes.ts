import express, { Router } from "express";
import {
  universitiesControllerFactory,
  userControllerFactory
} from "./factories/controller-factories";

const universityController = universitiesControllerFactory();
const userController = userControllerFactory();

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

routes.post("/user/create", userController.createUser);
routes.post("/user/login", userController.login);
routes.put("/user/reset", userController.resetPassword);

export { routes };
