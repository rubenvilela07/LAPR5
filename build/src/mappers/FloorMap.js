"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const floor_1 = require("../domain/floor/floor");
class FloorMap extends Mapper_1.Mapper {
    static toDTO(floor) {
        return {
            id: floor.id.toString(),
            floorNumber: floor.floorNumber,
            description: floor.description,
            buildingCode: floor.buildingCode.code
        };
    }
    static toDomain(floor) {
        const roleOrError = floor_1.Floor.create(floor, new UniqueEntityID_1.UniqueEntityID(floor.domainId));
        roleOrError.isFailure ? console.log(roleOrError.error) : '';
        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }
    static toPersistence(floor) {
        return {
            _id: floor.id.toString(),
            floorNumber: floor.floorNumber,
            description: floor.description,
            buildingCode: floor.buildingCode.code
        };
    }
}
exports.FloorMap = FloorMap;
//# sourceMappingURL=FloorMap.js.map