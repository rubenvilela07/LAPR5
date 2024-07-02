
import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";

import config from "../../../config";
import IRoomController from "../../controllers/IControllers/IRoomController";

const route = Router();

export default (app: Router) => {
  app.use("/room", route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post(
      "",
      celebrate({
        body: Joi.object({
          roomName: Joi.string().required(),
          description: Joi.string().optional().allow(''),
          roomType: Joi.string().valid('Gabinete', 'Anfiteatro', 'Laboratorio', 'Outro').required(),
          length: Joi.number().required(),
          width: Joi.number().required(),
          buildingCode: Joi.string().required(),
          floor: Joi.number().required(),
          locationX: Joi.number().required(),
          locationY: Joi.number().required(),
          locationDoorX: Joi.number().required(),
          locationDoorY: Joi.number().required(),
        }),
      }),
      (req, res, next) => ctrl.createRoom(req, res, next)
  );

  route.get(
      "/:code",
      celebrate({
        params: Joi.object({
          code: Joi.string().required(),
        }),
      }),
      (req, res, next) => ctrl.getRoomsInBuilding(req, res, next)
  );
};
