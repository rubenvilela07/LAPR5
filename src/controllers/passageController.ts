import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPassageService from "../services/IServices/IPassageService";
import IPassageDTO from "../dto/IPassageDTO";
import IPassageController from "./IControllers/IPassageController";




@Service()
export default class PassageController implements IPassageController{
  constructor(
    @Inject(config.services.passage.name)
    private passageServiceInstance: IPassageService
  ) {}

  public async createPassage(req: Request, res: Response, next: NextFunction) {
    try {
      const passageOrError = (await this.passageServiceInstance.createPassage(
        req.body as IPassageDTO
      )) as Result<IPassageDTO>;

      if (passageOrError.isFailure) {
        return res.status(400).send(passageOrError.errorValue());
      }

      const passageDTO = passageOrError.getValue();

      return res.json(passageDTO).status(201).send();
    } catch (e) {
      return next(e);
    }
  }

  public async updatePassage(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.id = req.params.id;
      const passageOrError = (await this.passageServiceInstance.updatePassage(req.body as IPassageDTO)) as Result<IPassageDTO>;

      if (passageOrError.isFailure) {
        return res.status(400).send(passageOrError.errorValue());
      }

      const passageDTO = passageOrError.getValue();
      return res.status(200).json(passageDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async listPassages(req: Request, res: Response, next: NextFunction) {
    try {
      const passagesOrError = await this.passageServiceInstance.getAllPassages() as Result<IPassageDTO[]>;
      if (passagesOrError.isFailure) {
        return res.status(400).send(passagesOrError.errorValue());
      }

      const passages = passagesOrError.getValue();
      return res.status(200).json(passages);
    } catch (e) {
      return next(e);
    }
  }
}
