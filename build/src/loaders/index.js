"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    // -------------------------------------- Schema Loader --------------------------------------
    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const buildingSchema = {
        // compare with the approach followed in repos and services
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };
    // -------------------------------------- Controller Loader --------------------------------------
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path
    };
    const buildingController = {
        name: config_1.default.controllers.building.name,
        path: config_1.default.controllers.building.path
    };
    // -------------------------------------- Repo Loader --------------------------------------
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const buildingRepo = {
        name: config_1.default.repos.building.name,
        path: config_1.default.repos.building.path
    };
    // -------------------------------------- Service Loader --------------------------------------
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path
    };
    const buildingService = {
        name: config_1.default.services.building.name,
        path: config_1.default.services.building.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            buildingSchema
        ],
        controllers: [
            roleController,
            buildingController
        ],
        repos: [
            roleRepo,
            userRepo,
            buildingRepo
        ],
        services: [
            roleService,
            buildingService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map