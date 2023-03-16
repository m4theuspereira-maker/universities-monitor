import express, { Router } from "express";
import {
  universitiesControllerFactory,
  userControllerFactory
} from "./factories/controller-factories";
import { requireAuth } from "./middlewares/authentication-middlewares";

const universityController = universitiesControllerFactory();
const userController = userControllerFactory();

const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

routes.post(
  "/universities",
  requireAuth,
  universityController.createUniversity
);
routes.get("/universities", requireAuth, universityController.getUniversities);
routes.get(
  "/universities/:universityId",
  requireAuth,
  universityController.getUniversityById
);
routes.put(
  "/universities/:universityToBeUpdatedId",
  requireAuth,
  universityController.updateUniversity
);
routes.delete(
  "/universities/:universityToBeDeletedId",
  requireAuth,
  universityController.deleteUniversity
);

routes.post("/user/create", userController.createUser);
routes.post("/user/login", userController.login);
routes.put("/user/reset", userController.resetPassword);

export { routes };
