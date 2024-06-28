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
let FloorController = class FloorController {
    constructor(floorServiceInstance) {
        this.floorServiceInstance = floorServiceInstance;
    }
    async getFloor(req, res, next) {
        try {
            const floorOrError = await this.floorServiceInstance.getFloor(req.params.id);
            if (floorOrError.isFailure) {
                return res.status(400).json({ message: floorOrError.errorValue() });
            }
            return res.status(200).json(floorOrError.getValue());
        }
        catch (e) {
            next(e);
        }
    }
    async createFloor(req, res, next) {
        try {
            const floorOrError = await this.floorServiceInstance.createFloor(req.body);
            if (floorOrError.isFailure) {
                return res.status(400).json({ message: floorOrError.errorValue() });
            }
            return res.status(200).json(floorOrError.getValue());
        }
        catch (e) {
            next(e);
        }
    }
    async updateFloor(req, res, next) {
        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.params.id, req.body);
            if (floorOrError.isFailure) {
                return res.status(400).json({ message: floorOrError.errorValue() });
            }
            return res.status(200).json(floorOrError.getValue());
        }
        catch (e) {
            next(e);
        }
    }
    async getFloorsInBuilding(req, res, next) {
        try {
            const floorOrError = await this.floorServiceInstance.getFloorsInBuilding(req.params.buildingCode);
            if (floorOrError.isFailure) {
                return res.status(400).json({ message: floorOrError.errorValue() });
            }
            return res.status(200).json(floorOrError.getValue());
        }
        catch (e) {
            next(e);
        }
    }
};
FloorController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.floor.name)),
    __metadata("design:paramtypes", [Object])
], FloorController);
exports.default = FloorController;
//# sourceMappingURL=floorController.js.map