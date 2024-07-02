import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
    createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
    getRoomsInBuilding(buildingId: string): Promise<Result<Array<IRoomDTO>>>;
}
