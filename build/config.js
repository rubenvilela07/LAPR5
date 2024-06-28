"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port : optional change to 4000 by JRT
     */
    port: parseInt(process.env.PORT, 10) || 4000,
    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI || "mongodb+srv://admin:123qweASD@atlascluster.azr8eij.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    controllers: {
        role: {
            name: "RoleController",
            path: "../controllers/roleController"
        },
        building: {
            name: "BuildingController",
            path: "../controllers/buildingController"
        },
        floor: {
            name: "FloorController",
            path: "../controllers/floorController"
        }
    },
    repos: {
        role: {
            name: "RoleRepo",
            path: "../repos/roleRepo"
        },
        user: {
            name: "UserRepo",
            path: "../repos/userRepo"
        },
        building: {
            name: "BuildingRepo",
            path: "../repos/buildingRepo"
        },
        floor: {
            name: "FloorRepo",
            path: "../repos/floorRepo"
        },
    },
    services: {
        role: {
            name: "RoleService",
            path: "../services/roleService"
        },
        building: {
            name: "BuildingService",
            path: "../services/buildingService"
        },
        floor: {
            name: "FloorService",
            path: "../services/floorService"
        }
    },
};
//# sourceMappingURL=config.js.map