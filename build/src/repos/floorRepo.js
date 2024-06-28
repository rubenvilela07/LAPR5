"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorRepo = class FloorRepo {
    constructor(floorSchema) {
        this.floorSchema = floorSchema;
    }
    async exists(floor) {
        const idX = floor.id.toString();
        const query = { domainId: idX };
        const buildingDocument = await this.floorSchema.findOne(query);
        return !!buildingDocument === true;
    }
    async save(floor) {
        const query = { domainId: floor.id.toString() };
        const floorComponent = await this.floorSchema.findOne(query);
        try {
            if (floorComponent === null) {
                const rawFloor = FloorMap_1.FloorMap.toPersistence(floor);
                const floorCreated = await this.floorSchema.create(rawFloor);
                return FloorMap_1.FloorMap.toDomain(floorCreated);
            }
            else {
                floorComponent.floorNumber = floor.floorNumber;
                floorComponent.description = floor.description;
                floorComponent.buildingCode = floor.buildingCode.code;
                await floorComponent.save();
                return floor;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByBuildingCode(code) {
        const query = { buildingCode: code };
        const floorRecords = await this.floorSchema.find(query);
        if (floorRecords != null) {
            return floorRecords.map(FloorMap_1.FloorMap.toDomain);
        }
        return null;
    }
    async findByDomainId(id) {
        const query = { domainId: id };
        const buildingRecord = await this.floorSchema.findOne(query);
        if (buildingRecord != null) {
            return FloorMap_1.FloorMap.toDomain(buildingRecord);
        }
        return null;
    }
    async findAll() {
        const floorRecords = await this.floorSchema.find();
        return floorRecords.map((floorRecord) => FloorMap_1.FloorMap.toDomain(floorRecord));
    }
    async existsNumber(floorNumber) {
        const query = { floorNumber: floorNumber };
        const floorDocument = await this.floorSchema.findOne(query);
        return !!floorDocument;
    }
};
FloorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('floorSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FloorRepo);
exports.default = FloorRepo;
//# sourceMappingURL=floorRepo.js.map