import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import {BuildingCode} from "./buildingCode";
import { Dimension } from "./dimension";
import  IBuildingDTO  from "./../../dto/IBuildingDTO";


interface BuildingProps {
    name: string;
    code: BuildingCode;
    description: string;
    dimension: Dimension;
}

export class Building extends AggregateRoot<BuildingProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get name (): string {
        return this.props.name;
    }
  
    get code (): BuildingCode {
        return this.props.code;
    }

    get description (): string {
        return this.props.description;
    }

    get dimension (): Dimension {
        return this.props.dimension;
    }

    private constructor (props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
        const buildingCodeDTO = buildingDTO.code;
        const buildingCodeOrError = BuildingCode.create(buildingCodeDTO);
        if(buildingCodeOrError.isFailure){
            return Result.fail<Building>(buildingCodeOrError.error);
        }

        const buildingNameDTO = buildingDTO.name;
        if (buildingNameDTO === null || buildingNameDTO === undefined || buildingNameDTO.length > 50) {
            return Result.fail<Building>("Building name is null, undefined or longer than 50 characters");
        }

        const buildingDescriptionDTO = buildingDTO.description;
        if (buildingDescriptionDTO === null || buildingDescriptionDTO === undefined || buildingDescriptionDTO.length > 255) {
            return Result.fail<Building>("Building description is null, undefined or longer than 255 characters");
        }

        const buildingLengthDTO = buildingDTO.length;
        const buildingWidthDTO = buildingDTO.width;
        const buildingDimensionOrError = Dimension.create(buildingLengthDTO, buildingWidthDTO);
        if (buildingDimensionOrError.isFailure) {
            return Result.fail<Building>(buildingDimensionOrError.error.toString())
        }


        const buildingProps: BuildingProps = {
            code: buildingCodeOrError.getValue(),
            name: buildingNameDTO,
            description: buildingDescriptionDTO,
            dimension: buildingDimensionOrError.getValue()
        }

        const building = new Building(buildingProps, id);
        return Result.ok<Building>( building )    

    }
}