import IFloorService from "./IServices/IFloorService";
import { Result } from "../core/logic/Result";
import IFloorDTO from "../dto/IFloorDTO";
import { Floor } from "../domain/floor/floor";
import IFloorRepo from "../repos/IRepos/IFloorRepo";
import config from "../../config";
import { Inject, Service } from "typedi";
import { FloorMap } from "../mappers/FloorMap";
import IBuildingRepo from "../repos/IRepos/IBuildingRepo";
import { Console } from "console";


@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
  ) {}

    public async getFloor(id: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(id);
            if (!floor) {
                return Result.fail<IFloorDTO>('Floor not found');
            }
            
            const floorDTO = FloorMap.toDTO(floor) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTO);
        } catch (e) {
            return Result.fail<IFloorDTO>(e);
        }
    }


    //TODO: implementar logica para verifica se o numero do andar é o minimo
    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floorNumberExists = await this.floorRepo.existsNumberInBuilding(floorDTO.floorNumber, floorDTO.buildingCode);
            if(floorNumberExists){
                return Result.fail<IFloorDTO>('Floor number already exists in building');
            }

            const building =  await this.buildingRepo.findByCode(floorDTO.buildingCode);
            if (!building) {
                return Result.fail<IFloorDTO>('Building not found');
            }

            if(building.numberOfFloors < floorDTO.floorNumber){
                return Result.fail<IFloorDTO>('Floor number is greater than the number of floors in the building');
            }

            const floorOrError = await Floor.create( floorDTO );
            if(floorOrError.isFailure){
                return Result.fail<IFloorDTO>(floorOrError.error);
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
            return Result.ok<IFloorDTO>( floorDTOResult );

        } catch (e) {
            return Result.fail<IFloorDTO>(e);
        }
    }

    public async updateFloor(id: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(id);
            if (!floor) {
                return Result.fail<IFloorDTO>('Floor not found');
            }
            else {
                floor.floorNumber = floorDTO.floorNumber;
                floor.description = floorDTO.description;
                

                if (await this.floorRepo.existsNumberInBuilding(floorDTO.floorNumber, floorDTO.buildingCode)) {
                    return Result.fail<IFloorDTO>('Floor number already exists');
                }

                const building =  await this.buildingRepo.findByCode(floorDTO.buildingCode);
                if (!building) {
                    return Result.fail<IFloorDTO>('Building not found');
                }
    
                if(building.numberOfFloors < floorDTO.floorNumber){
                    return Result.fail<IFloorDTO>('Floor number is greater than the number of floors in the building');
                }

                await this.floorRepo.save(floor);

                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>( floorDTOResult );
            }


        } catch (e) {
            return Result.fail<IFloorDTO>(e);
        }
    }

    public async getFloorsInBuilding(buildingCode: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.findByBuildingCode( buildingCode );
            if (!floors) {
                return Result.fail<IFloorDTO[]>('Floors not found');
            }

            const floorDTOs = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
            return Result.ok<IFloorDTO[]>(floorDTOs);
        
        } catch (e) {
            return Result.fail<IFloorDTO[]>(e);
        }
    }
}