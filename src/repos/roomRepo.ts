
import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import { RoomId } from "../domain/room/roomId";
import { RoomMap } from "../mappers/RoomMap";
import IRoomRepo from "../repos/IRepos/IRoomRepo";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { Room } from "../domain/room/room";
import IRoomDTO from "../dto/IRoomDTO";

@Service()
export default class RoomRepo implements IRoomRepo {
  constructor(
      @Inject("roomSchema") private roomSchema: Model<IRoomPersistence & Document>
  ) {}

  public async exists(room: Room): Promise<boolean> {
    const idX =
        room.id instanceof RoomId
            ? (<RoomId>room.id).id
            : room.id;

    const query = { domainId: idX };
    const roomDocument = await this.roomSchema.findOne(
        query as FilterQuery<IRoomPersistence & Document>
    );

    return !!roomDocument === true;
  }

  public async save(room: Room): Promise<Room> {
    const query = { domainId: room.id.toString() };
    const roomDocument = await this.roomSchema.findOne(query);

    try {
      if (roomDocument === null) {
        const rawRoom: any = RoomMap.toPersistence(room);

        const roomCreated = await this.roomSchema.create(rawRoom);

        return RoomMap.toDomain(roomCreated);
      } else {
        roomDocument.roomName = room.roomName.name;
        roomDocument.description = room.description;
        roomDocument.length = room.dimension.length;
        roomDocument.width = room.dimension.width;
        roomDocument.floor = room.floor;
        roomDocument.locationX = room.locationX;
        roomDocument.locationY = room.locationY;
        roomDocument.locationDoorX = room.doorLocationX;
        roomDocument.locationDoorY = room.doorLocationY;
        roomDocument.roomType = room.roomType;

        await roomDocument.save();
        return RoomMap.toDomain(roomDocument);
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(roomId: RoomId | string): Promise<Room> {
    const query = { domainId: roomId };
    const roomRecord = await this.roomSchema.findOne(
        query as FilterQuery<IRoomPersistence & Document>
    );

    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    } else return null;
  }

  public async findRoomsByBuildingId(buildingId: string): Promise<Array<Room>> {
    const query = { buildingId: buildingId };
    const roomRecord = await this.roomSchema.find(
        query as FilterQuery<IRoomPersistence & Document>
    );

    if (roomRecord != null) {
      return roomRecord.map((item) => {
        return RoomMap.toDomain(item);
      });
    } else return null;
  }

  public async findRoomsByBuildingCode(
      buildingCode: string
  ): Promise<Array<Room>> {
    const query = { buildingCode: buildingCode };
    const roomRecord = await this.roomSchema.find(
        query as FilterQuery<IRoomPersistence & Document>
    );

    if (roomRecord != null) {
      return roomRecord.map((item) => {
        return RoomMap.toDomain(item);
      });
    } else return null;
  }


  public async findRoomsInFloor(buildingCode: string, floorNumber: number) {
    const query = { buildingCode: buildingCode, floorNumber: floorNumber };
    const roomRecord = await this.roomSchema.find(
        query as FilterQuery<IRoomPersistence & Document>
    );

    if (roomRecord != null) {
      return roomRecord.map((item) => {
        return RoomMap.toDomain(item);
      });
    } else return null;
  }



  private doRoomsOverlap(room1: Room, room2: Room): boolean {
    const room1LocationX = room1.locationX;
    const room2LocationX = room2.locationX;
    const room1LocationY = room1.locationY;
    const room2LocationY = room2.locationY;

    return (
        room1LocationX < room2LocationX + room2.dimension.width &&
        room1LocationX + room1.dimension.width > room2LocationX &&
        room1LocationY < room2LocationY + room2.dimension.width &&
        room1LocationY + room1.dimension.width > room2LocationY
    );
  }



  async findOverlappingRooms(room: Room): Promise<Room[]> {
    const roomsInSameBuilding = await this.findRoomsByBuildingCode(
        room.buildingCode.code
    );

    const overlappingRooms = roomsInSameBuilding.filter((existingRoom) => {
      return this.doRoomsOverlap(existingRoom, room);
    });

    return overlappingRooms;
  }
}

