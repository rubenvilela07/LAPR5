import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IRoomService from "../services/IServices/IRoomService";
import {Result} from "../core/logic/Result";
import IRoomDTO from "../dto/IRoomDTO";




@Service()
export default class RoomController {
    constructor(
        @Inject(config.services.room.name)
        private roomServiceInstance: IRoomService
    ) { }

    public async createRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomOrError = (await this.roomServiceInstance.createRoom(
                req.body as IRoomDTO
            )) as Result<IRoomDTO>;

            if (roomOrError.isFailure) {
                return res.status(400).send(roomOrError.errorValue());
            }

            const roomDTO = roomOrError.getValue();

            return res.json(roomDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async listRoomsInBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const roomsOrError = await this.roomServiceInstance.getRoomsInBuilding(req.body) as Result<Array<IRoomDTO>>;

            if (roomsOrError.isFailure) {
                return res.status(400).send();
            }

            const roomDTOs = roomsOrError.getValue();

            return res.json(roomDTOs).status(200);
        } catch (e) {
            return next(e);
        }
    }


}