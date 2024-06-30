import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";

import config from "../../../config";
import IPassageController from "../../controllers/IControllers/IPassageController";

const route = Router();

export default (app: Router) => {
  app.use("/passage", route);

  const ctrl = Container.get(
    config.controllers.passage.name
  ) as IPassageController;

  route.post(
    "",
    celebrate({
      body: Joi.object({
        buildingCode1: Joi.string().required(),
        buildingCode2: Joi.string().required(),
        floor: Joi.number().required(),
        building1_x: Joi.number().required(),
        building1_y: Joi.number().required(),
        building2_x: Joi.number().required(),
        building2_y: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createPassage(req, res, next)
  );

  route.put(
      "/:id",
      celebrate({
        params: {
          id: Joi.string().required(),
        },
        body: Joi.object({
          buildingCode1: Joi.string().required(),
          buildingCode2: Joi.string().required(),
          floor: Joi.number().required(),
          building1_x: Joi.number().required(),
          building1_y: Joi.number().required(),
          building2_x: Joi.number().required(),
          building2_y: Joi.number().required(),
        }),
      }),
      (req, res, next) => ctrl.updatePassage(req, res, next)
  );

  route.get("", (req, res, next) => ctrl.listPassages(req, res, next));
};
