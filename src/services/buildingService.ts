import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingDTO from '../dto/IBuildingDTO';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import IBuildingRepo from '../repos/IRepos/IBuildingRepo';
import { Building } from "../domain/building/building";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}



  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
        const buildingOrError = await Building.create( buildingDTO );
        if (buildingOrError.isFailure) {
          return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
        }

        if (await this.buildingRepo.existsCode(buildingDTO.code)) {
          return Result.fail<IBuildingDTO>("Building code already exists");
        }

        const buildingResult = buildingOrError.getValue();

        await this.buildingRepo.save(buildingResult);

        const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult );
    }
    catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
        const building = await this.buildingRepo.findByDomainId(buildingDTO.id);

        if (building === null) {
          return Result.fail<IBuildingDTO>("Building not found");
        }
        else {
            if(!buildingDTO.name) buildingDTO.name = building.name;
            if(!buildingDTO.code) buildingDTO.code = building.code.code;
            if(!buildingDTO.description) buildingDTO.description = building.description;
            if(!buildingDTO.length) buildingDTO.length = building.dimension.length;
            if(!buildingDTO.width) buildingDTO.width = building.dimension.width;
            if(!buildingDTO.numberOfFloors) buildingDTO.numberOfFloors = building.numberOfFloors;

            if (await this.buildingRepo.existsCode(buildingDTO.code)) {
              return Result.fail<IBuildingDTO>("Building code already exists");
            }

            building.update(buildingDTO);

            await this.buildingRepo.save(building);

            const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
            return Result.ok<IBuildingDTO>( buildingDTOResult );
        }

    } catch (error) {
        throw error;
    }
  }

  public async getBuilding(id: string): Promise<Result<IBuildingDTO>> {
    try {
        const building = await this.buildingRepo.findByDomainId(id);

        if (building === null) {
          return Result.fail<IBuildingDTO>("Building not found");
        }

        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult );
    } catch (error) {
        throw error;
    }
  }

  public async getBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
        const buildings = await this.buildingRepo.findAll() as Building[];
        
        const buildingsDTO = buildings.map(building => BuildingMap.toDTO(building) as IBuildingDTO);

        return Result.ok<IBuildingDTO[]>( buildingsDTO );
    } catch (error) {
        throw error;
    }
  }
}
