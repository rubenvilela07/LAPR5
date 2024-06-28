import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService {
    getFloor(id: string): Promise<Result<IFloorDTO>>;
    createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    updateFloor(id: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    getFloorsInBuilding(buildingCode: string): Promise<Result<IFloorDTO[]>>;
}