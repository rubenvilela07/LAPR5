import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Floor } from "../domain/floor/floor";
import IFloorDTO from "../dto/IFloorDTO";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";


export class FloorMap extends Mapper<Floor> {
  
  public static toDTO( floor: Floor): IFloorDTO {
    return {
        id: floor.id.toString(),
        floorNumber: floor.floorNumber,
        description: floor.description,
        buildingCode: floor.buildingCode.code
    } as IFloorDTO;
  }

  public static toDomain (floor: any | Model<IFloorPersistence & Document> ): Floor {
    const floorOrError = Floor.create(
      floor,
      new UniqueEntityID(floor.domainId)
    );

    floorOrError.isFailure ? console.log(floorOrError.error) : '';

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence (floor: Floor): any {
    return {
      domainId: floor.id.toString(),
      floorNumber: floor.floorNumber,
      description: floor.description,
      buildingCode: floor.buildingCode.code
    }
  }
}