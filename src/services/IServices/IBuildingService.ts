import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";


export default interface IBuildingService  {
  getBuildings(): Result<IBuildingDTO[]> | PromiseLike<Result<IBuildingDTO[]>>;
  getBuilding(id: string): Result<IBuildingDTO> | PromiseLike<Result<IBuildingDTO>>;
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
}
