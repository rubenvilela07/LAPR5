import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from "../../../config";
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().optional().allow(''),
        code: Joi.string().required(),
        description: Joi.string().optional().allow(''),
        width: Joi.number().required(),
        length: Joi.number().required(),
        numberOfFloors: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next) );

  route.put('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      }),
      body: Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional(),
        description: Joi.string().optional(),
        width: Joi.number().optional(),
        length: Joi.number().optional(),
        numberOfFloors: Joi.number().optional()
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );

    route.get('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getBuilding(req, res, next) );

    route.get('',
    (req, res, next) => ctrl.getBuildings(req, res, next) );
};