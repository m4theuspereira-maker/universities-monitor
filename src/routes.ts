import express, { Router } from "express";
import {
  universitiesControllerFactory,
  userControllerFactory
} from "./factories/controller-factories";
import { middlewaresFactory } from "./factories/middlewares-factory";

const universityController = universitiesControllerFactory();
const userController = userControllerFactory();
const encryptionService = middlewaresFactory();

const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

routes.post(
  "/universities",
  encryptionService.requireAuthentication,
  universityController.createUniversity
);
routes.get(
  "/universities",
  encryptionService.requireAuthentication,
  universityController.getUniversities
);
routes.get(
  "/universities/:universityId",
  encryptionService.requireAuthentication,
  universityController.getUniversityById
);
routes.put(
  "/universities/:universityToBeUpdatedId",
  encryptionService.requireAuthentication,
  universityController.updateUniversity
);
routes.delete(
  "/universities/:universityToBeDeletedId",
  encryptionService.requireAuthentication,
  universityController.deleteUniversity
);

routes.post("/user/create", userController.createUser);
routes.post("/user/login", userController.login);
routes.put("/user/reset", userController.resetPassword);

export { routes };
