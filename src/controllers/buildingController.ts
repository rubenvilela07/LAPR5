import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IBuildingController from '../controllers/IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController {
  constructor(
    @Inject(config.services.building.name) private buildingServiceInstance: IBuildingService
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(400).json({ message: buildingOrError.errorValue() });
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(201).json({ message: "Building created successfully", data: buildingDTO });
    } catch (e) {
      return next(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.id = req.params.id;
      const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(400).json({ message: buildingOrError.errorValue() });
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(200).json({ message: "Building updated successfully", data: buildingDTO });
    } catch (e) {
      return next(e);
    }
  }

  public async getBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.getBuilding(req.params.id) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(400).json({ message: buildingOrError.errorValue() });
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(200).json({ message: "Building retrieved successfully", data: buildingDTO });
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingsOrError = await this.buildingServiceInstance.getBuildings() as Result<IBuildingDTO[]>;

      if (buildingsOrError.isFailure) {
        return res.status(400).json({ message: buildingsOrError.errorValue() });
      }

      const buildingsDTO = buildingsOrError.getValue();
      return res.status(200).json({ message: "Buildings retrieved successfully", data: buildingsDTO });
    } catch (e) {
      return next(e);
    }
  }
}
