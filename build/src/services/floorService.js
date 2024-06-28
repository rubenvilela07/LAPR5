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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../core/logic/Result");
const floor_1 = require("../domain/floor/floor");
const config_1 = __importDefault(require("../../config"));
const typedi_1 = require("typedi");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorService = class FloorService {
    constructor(floorRepo) {
        this.floorRepo = floorRepo;
    }
    async getFloor(id) {
        try {
            const floor = await this.floorRepo.findByDomainId(id);
            if (!floor) {
                return Result_1.Result.fail('Floor not found');
            }
            const floorDTO = FloorMap_1.FloorMap.toDTO(floor);
            return Result_1.Result.ok(floorDTO);
        }
        catch (e) {
            return Result_1.Result.fail(e);
        }
    }
    async createFloor(floorDTO) {
        try {
            const floorNumberExists = await this.floorRepo.existsNumber(floorDTO.floorNumber);
            if (floorNumberExists) {
                return Result_1.Result.fail('Floor number already exists');
            }
            const floorOrError = await floor_1.Floor.create(floorDTO);
            if (floorOrError.isFailure) {
                return Result_1.Result.fail(floorOrError.error);
            }
            const floorResult = floorOrError.getValue();
            await this.floorRepo.save(floorResult);
            const floorDTOResult = FloorMap_1.FloorMap.toDTO(floorResult);
            return Result_1.Result.ok(floorDTOResult);
        }
        catch (e) {
            return Result_1.Result.fail(e);
        }
    }
    async updateFloor(id, floorDTO) {
        try {
            const floor = await this.floorRepo.findByDomainId(id);
            if (!floor) {
                return Result_1.Result.fail('Floor not found');
            }
            else {
                if (!floorDTO.floorNumber)
                    floorDTO.floorNumber = floor.floorNumber;
                if (!floorDTO.description)
                    floorDTO.description = floor.description;
                if (!floorDTO.buildingCode)
                    floorDTO.buildingCode = floor.buildingCode.code;
                if (await this.floorRepo.existsNumber(floorDTO.floorNumber)) {
                    return Result_1.Result.fail('Floor number already exists');
                }
                await this.floorRepo.save(floor);
                const floorDTOResult = FloorMap_1.FloorMap.toDTO(floor);
                return Result_1.Result.ok(floorDTOResult);
            }
        }
        catch (e) {
            return Result_1.Result.fail(e);
        }
    }
    async getFloorsInBuilding(buildingCode) {
        try {
            const floors = await this.floorRepo.findByBuildingCode(buildingCode);
            if (!floors) {
                return Result_1.Result.fail('Floors not found');
            }
            const floorDTOs = floors.map(floor => FloorMap_1.FloorMap.toDTO(floor));
            return Result_1.Result.ok(floorDTOs);
        }
        catch (e) {
            return Result_1.Result.fail(e);
        }
    }
};
FloorService = __decorate([
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __metadata("design:paramtypes", [Object])
], FloorService);
exports.default = FloorService;
//# sourceMappingURL=floorService.js.map