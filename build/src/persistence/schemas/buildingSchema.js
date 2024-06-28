"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Building = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        index: true,
    },
    code: {
        type: String,
        required: [true, 'Please enter building code'],
        index: true,
        unique: true,
    },
    description: {
        type: String,
        index: true,
    },
    length: {
        type: Number,
        required: [true, 'Please enter building length'],
        index: true,
    },
    width: {
        type: Number,
        required: [true, 'Please enter building width'],
        index: true,
    },
    numberOfFloors: {
        type: Number,
        required: [true, 'Please enter number of floors'],
        index: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Building', Building);
//# sourceMappingURL=buildingSchema.js.map