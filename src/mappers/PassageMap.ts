import { Mapper } from "../core/infra/Mapper";
import { Document, Model, Types } from "mongoose";
import { Floor } from "../domain/floor/floor";
import IFloorDTO from "../dto/IFloorDTO";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Passage } from "../domain/passage/passage";
import IPassageDTO from "../dto/IPassageDTO";
import { IPassagePersistence } from "../dataschema/IPassagePersistence";

export class PassageMap extends Mapper<Passage> {
  public static toDTO(passage: Passage): IPassageDTO {
    return {
      id: passage.id.toString(),
      buildingCode1: passage.buildingCode1.code,
      buildingCode2: passage.buildingCode2.code,
      floor: passage.floor,
      building1_x: passage.building1_x,
      building1_y: passage.building1_y,
      building2_x: passage.building2_x,
      building2_y: passage.building2_y,
    } as IPassageDTO;
  }

  public static toDomain(
    passage: any | Model<IPassagePersistence & Document>
  ): Passage {
    const passageOrError = Passage.create(
      passage,
      new UniqueEntityID(passage.domainId)
    );

    passageOrError.isFailure ? console.log(passageOrError.error) : "";

    return passageOrError.isSuccess ? passageOrError.getValue() : null;
  }

  public static toPersistence(passage: Passage): any {
    return {
      domainId: passage.id.toString(),
      buildingCode1: passage.buildingCode1.code,
      buildingCode2: passage.buildingCode2.code,
      floor: passage.floor,
      building1_x: passage.building1_x,
      building1_y: passage.building1_y,
      building2_x: passage.building2_x,
      building2_y: passage.building2_y,
    };
  }
}
