"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const building_1 = require("../domain/building/building");
class BuildingMap extends Mapper_1.Mapper {
    static toDTO(building) {
        return {
            id: building.id.toString(),
            name: building.name,
            code: building.code.code,
            description: building.description,
            length: building.dimension.length,
            width: building.dimension.width,
            numberOfFloors: building.numberOfFloors
        };
    }
    static toDomain(building) {
        const roleOrError = building_1.Building.create(building, new UniqueEntityID_1.UniqueEntityID(building.domainId));
        roleOrError.isFailure ? console.log(roleOrError.error) : '';
        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }
    static toPersistence(building) {
        return {
            domainId: building.id.toString(),
            name: building.name,
            code: building.code.code,
            description: building.description,
            length: building.dimension.length,
            width: building.dimension.width,
            numberOfFloors: building.numberOfFloors
        };
    }
}
exports.BuildingMap = BuildingMap;
//# sourceMappingURL=BuildingMap.js.map