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
import { Building } from "../domain/building/building";


@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {}

  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const building1  = await this.buildingRepo.findByCode(passageDTO.buildingCode1);
      if (!building1) {
        return Result.fail<IPassageDTO>("Building 1 not found");
      }

      const building2  = await this.buildingRepo.findByCode(passageDTO.buildingCode2);
      if (!building2) {
        return Result.fail<IPassageDTO>("Building 2 not found");
      }

      if (building1.id.toString() === building2.id.toString()) {
        return Result.fail<IPassageDTO>("Buildings must be different");
      }

      if(!(this.validatePassagePosition(passageDTO.building1_x, passageDTO.building1_y, building1))){
        return Result.fail<IPassageDTO>("Invalid position for building 1");
      }

      if(!(this.validatePassagePosition(passageDTO.building2_x, passageDTO.building2_y, building2))){
        return Result.fail<IPassageDTO>("Invalid position for building 2");
      }

      if(building1.numberOfFloors < passageDTO.floor || building2.numberOfFloors < passageDTO.floor){
        return Result.fail<IPassageDTO>("Floor does not exist in one of the buildings");
      }

      const passageOrError = await Passage.create(passageDTO);
      if (passageOrError.isFailure) {
        return Result.fail<IPassageDTO>(passageOrError.error);
      }

      const passage = passageOrError.getValue();

      const passageExists = await this.passageRepo.exists(passage);
      if (passageExists) {
        return Result.fail<IPassageDTO>("Passage already exists");
      }

      await this.passageRepo.save(passage);

      const passageDTOresult = PassageMap.toDTO(passage) as IPassageDTO;
      return Result.ok<IPassageDTO>(passageDTOresult);
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

  public validatePassagePosition(x: number, y: number, building: Building): boolean {
    if (x < 0 || x > building.dimension.width) {
      return false;
    }

    if (y < 0 || y > building.dimension.length) {
      return false;
    }

    if (x == 0 && y <= building.dimension.length || x == building.dimension.width && y <= building.dimension.length) {
      return true;
    }

    if (y == 0 && x <= building.dimension.width || y == building.dimension.length && x <= building.dimension.width) {
      return true;
    }

    return false;
  }

  
}
