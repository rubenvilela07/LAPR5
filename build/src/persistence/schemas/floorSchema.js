"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const floor = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    buildingCode: {
        type: String,
        required: [true, "Please enter building code"],
        index: true
    },
    floorNumber: {
        type: Number,
        required: [true, "Please enter floor number"],
        index: true
    },
    description: {
        type: String,
        index: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Floor", floor);
//# sourceMappingURL=floorSchema.js.map