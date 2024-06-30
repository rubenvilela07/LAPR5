import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import IPassageDTO from "../../dto/IPassageDTO";
import { BuildingCode } from "../building/buildingCode";

interface PassageProps {
  buildingCode1: BuildingCode;
  buildingCode2: BuildingCode;
  floor: number;
  building1_x: number;
  building1_y: number;
  building2_x: number;
  building2_y: number;
}

export class Passage extends AggregateRoot<PassageProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingCode1(): BuildingCode {
    return this.props.buildingCode1;
  }

  get buildingCode2(): BuildingCode {
    return this.props.buildingCode2;
  }

  get floor(): number {
    return this.props.floor;
  }

  get building1_x(): number {
    return this.props.building1_x;
  }

  get building1_y(): number {
    return this.props.building1_y;
  }

  get building2_x(): number {
    return this.props.building2_x;
  }

  get building2_y(): number {
    return this.props.building2_y;
  }

  set buildingCode1(buildingCode1: BuildingCode) {
    this.props.buildingCode1 = buildingCode1;
  }

  set buildingCode2(buildingCode2: BuildingCode) {
    this.props.buildingCode2 = buildingCode2;
  }

  set floor(floor: number) {
    this.props.floor = floor;
  }

  set building1_x(building1_x: number) {
    this.props.building1_x = building1_x;
  }

  set building1_y(building1_y: number) {
    this.props.building1_y = building1_y;
  }

  set building2_x(building2_x: number) {
    this.props.building2_x = building2_x;
  }

  set building2_y(building2_y: number) {
    this.props.building2_y = building2_y;
  }


  public static create(
    passageDTO: IPassageDTO,
    id?: UniqueEntityID
  ): Result<Passage> {

    const buildingCode1DTO = passageDTO.buildingCode1;
    const buildingCode1OrError = BuildingCode.create(buildingCode1DTO);
    if (buildingCode1OrError.isFailure) {
      return Result.fail<Passage>(buildingCode1OrError.error.toString());
    }

    const buildingCode2DTO = passageDTO.buildingCode2;
    const buildingCode2OrError = BuildingCode.create(buildingCode2DTO);
    if (buildingCode2OrError.isFailure) {
      return Result.fail<Passage>(buildingCode2OrError.error.toString());
    }

    const passageProps: PassageProps = {
      buildingCode1: buildingCode1OrError.getValue(),
      buildingCode2: buildingCode2OrError.getValue(),
      floor: passageDTO.floor,
      building1_x: passageDTO.building1_x,
      building1_y: passageDTO.building1_y,
      building2_x: passageDTO.building2_x,
      building2_y: passageDTO.building2_y,
    };
    const passage = new Passage(passageProps, id);
    return Result.ok<Passage>(passage);
  }
}
