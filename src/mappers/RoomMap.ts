import { Mapper } from "../core/infra/Mapper";
import { Document, Model, Types } from "mongoose";
import { Room } from "../domain/room/room";
import IRoomDTO from "../dto/IRoomDTO";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {
  public static toDTO(room: Room): IRoomDTO {
    return {
      id: room.id.toString(),
      roomName: room.roomName.name,
      description: room.description,
      length: room.dimension.length,
      width: room.dimension.width,
      buildingCode: room.buildingCode.code,
      floor: room.floor,
      locationX: room.locationX,
      locationY: room.locationY,
      locationDoorX: room.doorLocationX,
      locationDoorY: room.doorLocationY,
      roomType: room.roomType,

    } as IRoomDTO;
  }

  public static toDomain(room: any | Model<IRoomPersistence & Document>): Room {
    const roomOrError = Room.create(room, new UniqueEntityID(room.domainId));

    roomOrError.isFailure ? console.log(roomOrError.error) : "";

    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence(room: Room): any {
    return {
      domainId: room.id.toString(),
      roomName: room.roomName.name,
      description: room.description,
      length: room.dimension.length,
      width: room.dimension.width,
      buildingCode: room.buildingCode.code,
      selectedFloor: room.floor,
      locationX: room.locationX,
      locationY: room.locationY,
      locationDoorX: room.doorLocationX,
      locationDoorY: room.doorLocationX,
      roomType: room.roomType,
      floor: room.floor
    };



  }
}
