"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/building', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.building.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().optional().allow(''),
            code: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().optional().allow(''),
            width: celebrate_1.Joi.number().required(),
            length: celebrate_1.Joi.number().required(),
            numberOfFloors: celebrate_1.Joi.number().required()
        })
    }), (req, res, next) => ctrl.createBuilding(req, res, next));
    route.put('/:id', (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required()
        }),
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().optional(),
            code: celebrate_1.Joi.string().optional(),
            description: celebrate_1.Joi.string().optional(),
            width: celebrate_1.Joi.number().optional(),
            length: celebrate_1.Joi.number().optional(),
            numberOfFloors: celebrate_1.Joi.number().optional()
        }),
    }), (req, res, next) => ctrl.updateBuilding(req, res, next));
    route.get('/:id', (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => ctrl.getBuilding(req, res, next));
    route.get('', (req, res, next) => ctrl.getBuildings(req, res, next));
};
//# sourceMappingURL=buildingRoute.js.map