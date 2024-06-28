import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IFloorService from '../services/IServices/IFloorService';
import IFloorController from './IControllers/IFloorController';
import IFloorDTO from '../dto/IFloorDTO';

@Service()
export default class FloorController implements IFloorController {
  constructor(
    @Inject(config.services.floor.name) private floorServiceInstance: IFloorService
  ) {}


    public async getFloor(req: Request, res: Response, next: NextFunction) {
        try {
        const floorOrError = await this.floorServiceInstance.getFloor(req.params.id);
        if (floorOrError.isFailure) {
            return res.status(400).json({ message: floorOrError.errorValue() });
        }
        return res.status(200).json(floorOrError.getValue());
        } catch (e) {
        next(e);
        }
    }

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
        const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO);
        if (floorOrError.isFailure) {
            return res.status(400).json({ message: floorOrError.errorValue() });
        }
        return res.status(200).json(floorOrError.getValue());
        } catch (e) {
        next(e);
        }
    }


    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {
        const floorOrError = await this.floorServiceInstance.updateFloor(req.params.id, req.body);
        if (floorOrError.isFailure) {
            return res.status(400).json({ message: floorOrError.errorValue() });
        }
        return res.status(200).json(floorOrError.getValue());
        } catch (e) {
        next(e);
        }
    }


    public async getFloorsInBuilding(req: Request, res: Response, next: NextFunction) {
        try {
        const floorOrError = await this.floorServiceInstance.getFloorsInBuilding(req.params.buildingCode);
        if (floorOrError.isFailure) {
            return res.status(400).json({ message: floorOrError.errorValue() });
        }
        return res.status(200).json(floorOrError.getValue());
        } catch (e) {
        next(e);
        }
    }
  
}
