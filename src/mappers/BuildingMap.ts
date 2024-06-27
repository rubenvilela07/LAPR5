import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Building } from "../domain/building/building";
import IBuildingDTO from "../dto/IBuildingDTO";
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";


export class BuildingMap extends Mapper<Building> {
  
  public static toDTO( building: Building): IBuildingDTO {
    return {
        id: building.id.toString(),
        name: building.name,
        code: building.code.code,
        description: building.description,
        length: building.dimension.length,
        width: building.dimension.width,
        numberOfFloors: building.numberOfFloors
    } as IBuildingDTO;
  }

  public static toDomain (building: any | Model<IBuildingPersistence & Document> ): Building {
    const roleOrError = Building.create(
      building,
      new UniqueEntityID(building.domainId)
    );

    roleOrError.isFailure ? console.log(roleOrError.error) : '';

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence (building: Building): any {
    return {
        domainId: building.id.toString(),
        name: building.name,
        code: building.code.code,
        description: building.description,
        length: building.dimension.length,
        width: building.dimension.width,
        numberOfFloors: building.numberOfFloors
    }
  }
}