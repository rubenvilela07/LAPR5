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
let BuildingController = class BuildingController {
    constructor(buildingServiceInstance) {
        this.buildingServiceInstance = buildingServiceInstance;
    }
    async createBuilding(req, res, next) {
        try {
            const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body);
            if (buildingOrError.isFailure) {
                return res.status(400).json({ message: buildingOrError.errorValue() });
            }
            const buildingDTO = buildingOrError.getValue();
            return res.status(201).json({ message: "Building created successfully", data: buildingDTO });
        }
        catch (e) {
            return next(e);
        }
    }
    async updateBuilding(req, res, next) {
        try {
            req.body.id = req.params.id;
            const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body);
            if (buildingOrError.isFailure) {
                return res.status(404).json({ message: buildingOrError.errorValue() });
            }
            const buildingDTO = buildingOrError.getValue();
            return res.status(200).json({ message: "Building updated successfully", data: buildingDTO });
        }
        catch (e) {
            return next(e);
        }
    }
    async getBuilding(req, res, next) {
        try {
            const buildingOrError = await this.buildingServiceInstance.getBuilding(req.params.id);
            if (buildingOrError.isFailure) {
                return res.status(404).json({ message: buildingOrError.errorValue() });
            }
            const buildingDTO = buildingOrError.getValue();
            return res.status(200).json({ message: "Building retrieved successfully", data: buildingDTO });
        }
        catch (e) {
            return next(e);
        }
    }
    async getBuildings(req, res, next) {
        try {
            const buildingsOrError = await this.buildingServiceInstance.getBuildings();
            if (buildingsOrError.isFailure) {
                return res.status(404).json({ message: buildingsOrError.errorValue() });
            }
            const buildingsDTO = buildingsOrError.getValue();
            return res.status(200).json({ message: "Buildings retrieved successfully", data: buildingsDTO });
        }
        catch (e) {
            return next(e);
        }
    }
};
BuildingController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.building.name)),
    __metadata("design:paramtypes", [Object])
], BuildingController);
exports.default = BuildingController;
//# sourceMappingURL=buildingController.js.map