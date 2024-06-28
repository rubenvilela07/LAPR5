"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Guard_1 = require("../../core/logic/Guard");
const Result_1 = require("../../core/logic/Result");
const buildingCode_1 = require("../building/buildingCode");
class Floor extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get floorNumber() {
        return this.props.floorNumber;
    }
    get description() {
        return this.props.description;
    }
    get buildingCode() {
        return this.props.buildingCode;
    }
    set floorNumber(value) {
        this.props.floorNumber = value;
    }
    set description(value) {
        this.props.description = value;
    }
    updateFloorNumber(floorNumber) {
        throw new Error("Method not implemented.");
    }
    updateFloorDescription(description) {
        throw new Error("Method not implemented.");
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(floorDTO, id) {
        const floorBuildingCodeDTO = floorDTO.buildingCode;
        const floorBuildingCodeOrError = buildingCode_1.BuildingCode.create(floorBuildingCodeDTO);
        if (floorBuildingCodeOrError.isFailure) {
            return Result_1.Result.fail(floorBuildingCodeOrError.error.toString());
        }
        const floorProps = {
            floorNumber: floorDTO.floorNumber,
            description: floorDTO.description,
            buildingCode: floorBuildingCodeOrError.getValue(),
        };
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: floorProps.floorNumber, argumentName: 'floorNumber' },
            { argument: floorProps.description, argumentName: 'description' },
        ]);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const floor = new Floor(floorProps, id);
        return Result_1.Result.ok(floor);
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map