import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IFloorRepo from "../repos/IRepos/IFloorRepo";
import IBuildingRepo from "../repos/IRepos/IBuildingRepo";
import IPassageService from "./IServices/IPassageService";
import IPassageRepo from "../repos//IRepos/IPassageRepo";
import IPassageDTO from "../dto/IPassageDTO";
import { Passage } from "../domain/passage/passage";
import { PassageMap } from "../mappers/PassageMap";
import IRoleRepo from "../repos//IRepos/IRoleRepo";


@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.role.name) private roleRepo: IRoleRepo
  ) {}

  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      throw new Error("Method not implemented.");

    } catch (e) {
      return Result.fail<IPassageDTO>(e);
    }
  }
  updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    throw new Error("Method not implemented.");
  }
  getAllPassages(): Promise<Result<IPassageDTO[]>> {
    throw new Error("Method not implemented.");
  }

  
}
