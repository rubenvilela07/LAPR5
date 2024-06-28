import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";
import { BuildingCode } from "../building/buildingCode";

interface FloorProps {
  floorNumber: number;
  description: string;
  buildingCode: BuildingCode;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get floorNumber(): number {
    return this.props.floorNumber;
  }

  get description(): string {
    return this.props.description;
  }

  get buildingCode(): BuildingCode {
    return this.props.buildingCode;
  }

  set floorNumber(value: number) {
    this.props.floorNumber = value;
  }

  set description(value: string) {
    this.props.description = value;
  }


  public updateFloorNumber(floorNumber: number) {
    throw new Error("Method not implemented.");
  }


  public updateFloorDescription(description: string) {
    throw new Error("Method not implemented.");
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    floorDTO: IFloorDTO,
    id?: UniqueEntityID
  ): Result<Floor> {
    const floorBuildingCodeDTO = floorDTO.buildingCode;
    const floorBuildingCodeOrError = BuildingCode.create(floorBuildingCodeDTO);
    if (floorBuildingCodeOrError.isFailure) {
      return Result.fail<Floor>(floorBuildingCodeOrError.error.toString());
    }


    const floorProps: FloorProps = {
      floorNumber: floorDTO.floorNumber,
      description: floorDTO.description,
      buildingCode: floorBuildingCodeOrError.getValue(),
    };

    const guardResult = Guard.againstNullOrUndefinedBulk([
        { argument: floorProps.floorNumber, argumentName: 'floorNumber' },
        { argument: floorProps.description, argumentName: 'description' },
        ]);

    if (!guardResult.succeeded) {
        return Result.fail<Floor>(guardResult.message)
    }
    
    const floor = new Floor(floorProps, id);
    return Result.ok<Floor>(floor);
  }
}