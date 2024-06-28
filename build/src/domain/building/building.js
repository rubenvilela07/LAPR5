"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Result_1 = require("../../core/logic/Result");
const buildingCode_1 = require("./buildingCode");
const dimension_1 = require("./dimension");
class Building extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get name() {
        return this.props.name;
    }
    get code() {
        return this.props.code;
    }
    get description() {
        return this.props.description;
    }
    get dimension() {
        return this.props.dimension;
    }
    get numberOfFloors() {
        return this.props.numberOfFloors;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(buildingDTO, id) {
        const buildingCodeDTO = buildingDTO.code;
        const buildingCodeOrError = buildingCode_1.BuildingCode.create(buildingCodeDTO);
        if (buildingCodeOrError.isFailure) {
            return Result_1.Result.fail(buildingCodeOrError.error);
        }
        const buildingNameDTO = buildingDTO.name;
        if (buildingNameDTO === null || buildingNameDTO === undefined || buildingNameDTO.length > 50) {
            return Result_1.Result.fail("Building name is null, undefined or longer than 50 characters");
        }
        const buildingDescriptionDTO = buildingDTO.description;
        if (buildingDescriptionDTO === null || buildingDescriptionDTO === undefined || buildingDescriptionDTO.length > 255) {
            return Result_1.Result.fail("Building description is null, undefined or longer than 255 characters");
        }
        const buildingLengthDTO = buildingDTO.length;
        const buildingWidthDTO = buildingDTO.width;
        const buildingDimensionOrError = dimension_1.Dimension.create(buildingLengthDTO, buildingWidthDTO);
        if (buildingDimensionOrError.isFailure) {
            return Result_1.Result.fail(buildingDimensionOrError.error.toString());
        }
        const buildingNumberOfFloorsDTO = buildingDTO.numberOfFloors;
        if (buildingNumberOfFloorsDTO === null || buildingNumberOfFloorsDTO === undefined || buildingNumberOfFloorsDTO < 1) {
            return Result_1.Result.fail("Building number of floors is null, undefined or less than 1");
        }
        const buildingProps = {
            code: buildingCodeOrError.getValue(),
            name: buildingNameDTO,
            description: buildingDescriptionDTO,
            dimension: buildingDimensionOrError.getValue(),
            numberOfFloors: buildingNumberOfFloorsDTO
        };
        const building = new Building(buildingProps, id);
        return Result_1.Result.ok(building);
    }
    update(buildingDTO) {
        const buildingCodeDTO = buildingDTO.code;
        const buildingCodeOrError = buildingCode_1.BuildingCode.create(buildingCodeDTO);
        if (buildingCodeOrError.isFailure) {
            return Result_1.Result.fail(buildingCodeOrError.error);
        }
        const buildingNameDTO = buildingDTO.name;
        if (buildingNameDTO === null || buildingNameDTO === undefined || buildingNameDTO.length > 50) {
            return Result_1.Result.fail("Building name is null, undefined or longer than 50 characters");
        }
        const buildingDescriptionDTO = buildingDTO.description;
        if (buildingDescriptionDTO === null || buildingDescriptionDTO === undefined || buildingDescriptionDTO.length > 255) {
            return Result_1.Result.fail("Building description is null, undefined or longer than 255 characters");
        }
        const buildingLengthDTO = buildingDTO.length;
        const buildingWidthDTO = buildingDTO.width;
        const buildingDimensionOrError = dimension_1.Dimension.create(buildingLengthDTO, buildingWidthDTO);
        if (buildingDimensionOrError.isFailure) {
            return Result_1.Result.fail(buildingDimensionOrError.error.toString());
        }
        const buildingNumberOfFloorsDTO = buildingDTO.numberOfFloors;
        if (buildingNumberOfFloorsDTO === null || buildingNumberOfFloorsDTO === undefined || buildingNumberOfFloorsDTO < 1) {
            return Result_1.Result.fail("Building number of floors is null, undefined or less than 1");
        }
        this.props.code = buildingCodeOrError.getValue();
        this.props.name = buildingNameDTO;
        this.props.description = buildingDescriptionDTO;
        this.props.dimension = buildingDimensionOrError.getValue();
        this.props.numberOfFloors = buildingNumberOfFloorsDTO;
    }
}
exports.Building = Building;
//# sourceMappingURL=building.js.map