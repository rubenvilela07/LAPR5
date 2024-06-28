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
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const Result_1 = require("../core/logic/Result");
const building_1 = require("../domain/building/building");
const BuildingMap_1 = require("../mappers/BuildingMap");
let BuildingService = class BuildingService {
    constructor(buildingRepo) {
        this.buildingRepo = buildingRepo;
    }
    async createBuilding(buildingDTO) {
        try {
            const buildingOrError = await building_1.Building.create(buildingDTO);
            if (buildingOrError.isFailure) {
                return Result_1.Result.fail(buildingOrError.errorValue());
            }
            if (await this.buildingRepo.existsCode(buildingDTO.code)) {
                return Result_1.Result.fail("Building code already exists");
            }
            const buildingResult = buildingOrError.getValue();
            await this.buildingRepo.save(buildingResult);
            const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(buildingResult);
            return Result_1.Result.ok(buildingDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateBuilding(buildingDTO) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
            if (building === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                if (!buildingDTO.name)
                    buildingDTO.name = building.name;
                if (!buildingDTO.code)
                    buildingDTO.code = building.code.code;
                if (!buildingDTO.description)
                    buildingDTO.description = building.description;
                if (!buildingDTO.length)
                    buildingDTO.length = building.dimension.length;
                if (!buildingDTO.width)
                    buildingDTO.width = building.dimension.width;
                if (!buildingDTO.numberOfFloors)
                    buildingDTO.numberOfFloors = building.numberOfFloors;
                if (await this.buildingRepo.existsCode(buildingDTO.code)) {
                    return Result_1.Result.fail("Building code already exists");
                }
                building.update(buildingDTO);
                await this.buildingRepo.save(building);
                const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(building);
                return Result_1.Result.ok(buildingDTOResult);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getBuilding(id) {
        try {
            const building = await this.buildingRepo.findByDomainId(id);
            if (building === null) {
                return Result_1.Result.fail("Building not found");
            }
            const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(building);
            return Result_1.Result.ok(buildingDTOResult);
        }
        catch (error) {
            throw error;
        }
    }
    async getBuildings() {
        try {
            const buildings = await this.buildingRepo.findAll();
            const buildingsDTO = buildings.map(building => BuildingMap_1.BuildingMap.toDTO(building));
            return Result_1.Result.ok(buildingsDTO);
        }
        catch (error) {
            throw error;
        }
    }
};
BuildingService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object])
], BuildingService);
exports.default = BuildingService;
//# sourceMappingURL=buildingService.js.map