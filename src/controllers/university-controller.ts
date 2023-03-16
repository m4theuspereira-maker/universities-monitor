import { University } from "../infra/database/mongodb/models/university-model";
import { UniversityServices } from "../services/university-services";
import { Request, Response } from "express";
import { notFoundError, ok, serverError } from "./handlers/handlers";

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

      return ok(res, departamentCreated);
    } catch (error) {
      return serverError(res, error);
    }
  };

  getUniversities = async (req: Request, res: Response) => {
    try {
      const { country, page } = req.query as unknown as {
        country: string;
        page: number;
      };

      const universitiesFound = await this.universityService.findMany(
        Number(page),
        country
      );

      return ok(res, universitiesFound);
    } catch (error) {
      return serverError(res, error);
    }
  };

  getUniversityById = async (req: Request, res: Response) => {
    try {
      const { universityId } = req.params;

      const universitiesFound = await this.universityService.findOneUniversity(
        universityId
      );

      if (!universitiesFound) {
        return notFoundError(res, "university not found");
      }

      return ok(res, universitiesFound);
    } catch (error) {
      return serverError(res, error);
    }
  };

  updateUniversity = async (req: Request, res: Response) => {
    try {
      const { universityToBeUpdatedId } = req.params;
      const updatePaylaod = req.body;


      const universitiesFound = await this.universityService.updateUniversity(
        universityToBeUpdatedId,
        { ...updatePaylaod }
      );

      if (!universitiesFound) {
        return notFoundError(res, "university not found");
      }

      return ok(res, universitiesFound);
    } catch (error) {
      return serverError(res, error);
    }
  };

  deleteUniversity = async (req: Request, res: Response) => {
    try {
      const { universityToBeDeletedId } = req.params;

      const universityDeleted = await this.universityService.deleteUniversity(
        universityToBeDeletedId,
      );

      if (!universityDeleted) {
        return notFoundError(res, "university not found");
      }

      return ok(res, universityDeleted);
    } catch (error) {
      return serverError(res, error);
    }
  };
}
