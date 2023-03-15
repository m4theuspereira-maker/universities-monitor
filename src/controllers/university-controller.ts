import { University } from "../infra/database/mongodb/models/university-model";
import { UniversityServices } from "../services/university-services";
import { Request, Response } from "express";
import { ok } from "./handlers/handlers";

export class UniversityController {
  constructor(private readonly universityService: UniversityServices) {}

  createUniversity = async (req: Request, res: Response) => {
    try {
      const {
        state_province,
        domains,
        country,
        web_pages,
        name,
        alpha_two_code
      } = req.body as unknown as University;

      const departamentCreated = await this.universityService.createUniversity({
        state_province,
        domains,
        country,
        web_pages,
        name,
        alpha_two_code
      });

      return ok(departamentCreated);
    } catch (error) {
      return new Error();
    }
  };
}
