import { Repo } from "../../core/infra/Repo";
import { RoomId } from "../../domain/room/roomId";
import { Room } from "../../domain/room/room";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomRepo extends Repo<Room> {
  findRoomsInFloor(
    buildingCode: string,
    floorNumber: number
  ): Promise<Array<Room>>;
  findRoomsByBuildingId(buildingId: string): Promise<Array<Room>>;
  save(room: Room): Promise<Room>;
  findByDomainId(roomId: RoomId | string): Promise<Room>;
  findRoomsByBuildingCode(buildingCode: string): Promise<Array<Room>>;
  findOverlappingRooms(room: Room): Promise<Room[]>;
  findRoomsInFloor(
    buildingCode: string,
    floorNumber: number
  ): Promise<Array<Room>>;
}
