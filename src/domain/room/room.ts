import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { RoomName } from "./roomName";
import IRoomDTO from "../../dto/IRoomDTO";
import { RoomDimension } from "./roomDimension";
import { BuildingCode } from "../building/buildingCode";

interface RoomProps {
  roomName: RoomName;
  description: string;
  dimension: RoomDimension;
  buildingCode: BuildingCode;
  floor: number;
  locationX: number;
  locationY: number;
  doorLocationX: number;
  doorLocationY: number;
  roomType: string;
}

export class Room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get roomName(): RoomName {
    return this.props.roomName;
  }

  get description(): string {
    return this.props.description;
  }

  get dimension(): RoomDimension {
    return this.props.dimension;
  }

  get buildingCode(): BuildingCode {
    return this.props.buildingCode;
  }

  get floor(): number {
    return this.props.floor;
  }

  get locationX(): number {
    return this.props.locationX;
  }

  get locationY(): number {
    return this.props.locationY;
  }

  get doorLocationX(): number {
    return this.props.doorLocationX;
  }

  get doorLocationY(): number {
    return this.props.doorLocationY;
  }

  get roomType(): string {
    return this.props.roomType;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
    const roomNameDTO = roomDTO.roomName;
    const roomNameOrError = RoomName.create(roomNameDTO);
    if (roomNameOrError.isFailure) {
      return Result.fail<Room>(roomNameOrError.error.toString());
    }



    const roomDescriptionDTO = roomDTO.description;
    if (roomDescriptionDTO.length < 0 || roomDescriptionDTO.length > 100) {
      return Result.fail<Room>('Description length must be between 0 and 100 characters.');
    }

    const roomLengthDTO = roomDTO.length;
    const roomWidthDTO = roomDTO.width;
    const roomDimensionOrError = RoomDimension.create(
      roomLengthDTO,
      roomWidthDTO
    );
    if (roomDimensionOrError.isFailure) {
      return Result.fail<Room>(roomDimensionOrError.error.toString());
    }

    const buildingCodeDTO = roomDTO.buildingCode;
    const buildingCodeOrError = BuildingCode.create(buildingCodeDTO);
    if (buildingCodeOrError.isFailure) {
      return Result.fail<Room>(buildingCodeOrError.error.toString());
    }

    const roomLocationXDTO = roomDTO.locationX;
    const roomLocationYDTO = roomDTO.locationY;
    if (roomLocationXDTO < 0 || roomLocationYDTO < 0) {
      return Result.fail<Room>('Location coordinates must be positive.');
    }

    const roomDoorLocationXDTO = roomDTO.locationDoorX;
    const roomDoorLocationYDTO = roomDTO.locationDoorY;
    if ((roomDoorLocationXDTO < 0 || roomDoorLocationYDTO < 0) && roomDoorLocationXDTO >  roomLocationXDTO + roomLengthDTO && roomDoorLocationYDTO > roomLocationYDTO + roomWidthDTO){
      return Result.fail<Room>('Door location coordinates must be positive and inside the room.');
    }

    const roomProps: RoomProps = {
      roomName: roomNameOrError.getValue(),
      description: roomDescriptionDTO,
      dimension: roomDimensionOrError.getValue(),
      buildingCode: buildingCodeOrError.getValue(),
      floor: roomDTO.floor,
      locationX: roomLocationXDTO,
      locationY: roomLocationYDTO,
      doorLocationX: roomDoorLocationXDTO,
      doorLocationY: roomDoorLocationYDTO,
      roomType: roomDTO.roomType,
    };

    const room = new Room(roomProps, id);
    return Result.ok<Room>(room);
  }
}
