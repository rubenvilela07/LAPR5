import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from "../../../config";
import IFloorController from '../../controllers/IControllers/IFloorController';

const route = Router();

export default (app: Router) => {
  app.use('/floor', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post('',
    celebrate({
      body: Joi.object({
        floorNumber: Joi.number().required(),
        description: Joi.string().optional().allow(''),
        buildingCode: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createFloor(req, res, next) );

  route.put('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      }),
      body: Joi.object({
        floorNumber: Joi.number().optional(),
        description: Joi.string().optional(),
        buildingCode: Joi.string().optional()
      }),
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next) );

    route.get('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getFloorsInBuilding(req, res, next) );

    route.get('',
    (req, res, next) => ctrl.getFloor(req, res, next) );
};