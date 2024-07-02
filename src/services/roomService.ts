import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRoomService from "./IServices/IRoomService";
import { RoomMap } from "../mappers/RoomMap";
import { Room } from "../domain/room/room";
import IRoomRepo from "../repos/IRepos/IRoomRepo";
import IRoomDTO from "../dto/IRoomDTO";
import IBuildingRepo from "../repos/IRepos/IBuildingRepo";
import IBuildingDTO from "../dto/IBuildingDTO";
import IRoleRepo from "../repos/IRepos/IRoleRepo";


@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,

) {}

  public async createRoom(
      roomDTO: IRoomDTO
  ): Promise<Result<IRoomDTO>> {
    try {
      const buildingIdOrError = await this.buildingRepo.findByCode(
          roomDTO.buildingCode
      );
      if (buildingIdOrError === null) {
        return Result.fail<IRoomDTO>("Building not found");
      }

      const isWithinBuildingDimensions = await this.isRoomWithinBuildingDimensions(
        roomDTO.length, roomDTO.width, buildingIdOrError.dimension.length, buildingIdOrError.dimension.width
      );
      if (!isWithinBuildingDimensions) {
        return Result.fail<IRoomDTO>(
            "Room dimensions exceed building dimensions."
        );
      }

      const isDoorWithinRoomDimensions = await this.isDoorWithinRoomDimensions(
        roomDTO.locationDoorX, roomDTO.locationDoorY, roomDTO.length, roomDTO.width, roomDTO.locationX, roomDTO.locationY
      );
      if (!isDoorWithinRoomDimensions) {
        return Result.fail<IRoomDTO>(
            "Door location is not within room dimensions."
        );
      }


      const roomOrError = await Room.create(roomDTO);
      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }
      const newRoom = roomOrError.getValue();

      const overlappingRooms = await this.roomRepo.findOverlappingRooms(
          newRoom
      );
      if (overlappingRooms.length > 0) {
        return Result.fail<IRoomDTO>(
            "Sobreposição detectada com outros Rooms."
        );
      }


      await this.roomRepo.save(newRoom);
      const roomDTOResult = RoomMap.toDTO(newRoom) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOResult);
    } catch (e) {
      return Result.fail<IRoomDTO>(e.message);
    }
  }

  public async getRoomsInBuilding(
    buildingCode: string
  ): Promise<Result<Array<IRoomDTO>>> {
    try {
      const buildingCodeOrError = await this.buildingRepo.findByCode(
        buildingCode
      );
      if (buildingCodeOrError === null) {
        return Result.fail<Array<IRoomDTO>>("Building not found");
      }

      const rooms = await this.roomRepo.findRoomsByBuildingCode(buildingCode);
      if (rooms === null) {
        return Result.fail<Array<IRoomDTO>>("Rooms not found");
      }

      const roomDTOs = rooms.map((room) => {
        return RoomMap.toDTO(room) as IRoomDTO;
      });

      return Result.ok<Array<IRoomDTO>>(roomDTOs);
    } catch (e) {
      throw e;
    }
  }

  private async isRoomWithinBuildingDimensions(roomLength: number, roomWidth: number, buildingLength: number, buildingWidth: number): Promise<boolean> {
    if (roomLength > buildingLength || roomWidth > buildingWidth) {
      return false;
    }
    return true;
  }

  private async isDoorWithinRoomDimensions(doorX: number, doorY: number, roomLength: number, roomWidth: number, roomLocationX:  number, roomLocationY: number): Promise<boolean> {
    if (doorX > roomLength || doorY > roomWidth || doorX < roomLocationX || doorY < roomLocationY) {
      return false;
    }

    if ((doorX  == roomLocationX && doorY <= roomLocationY + roomLength) || (doorX == roomLocationX + roomWidth && doorY <= roomLocationY + roomLength)) {
      return true;
    }

    if ((doorY == roomLocationY && doorX <= roomLocationX + roomWidth) || (doorY == roomLocationY + roomLength && doorX <= roomLocationX + roomWidth)) {
      return true;
    }

    return false;
  }
}
