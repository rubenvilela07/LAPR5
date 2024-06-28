import { Request, Response, NextFunction } from 'express';
import { ParsedQs } from 'qs';

export default interface IFloorController  {
  getFloor(req: Request, res: Response, next: NextFunction);
  createFloor(req: Request, res: Response, next: NextFunction);
  updateFloor(req: Request, res: Response, next: NextFunction);
  getFloorsInBuilding(req: Request, res: Response, next: NextFunction);
}