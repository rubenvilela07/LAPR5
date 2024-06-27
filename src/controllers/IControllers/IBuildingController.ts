import { Request, Response, NextFunction } from 'express';
import { ParsedQs } from 'qs';

export default interface IBuildingController  {
  getBuilding(req: Request, res: Response, next: NextFunction);
  createBuilding(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);
  getBuildings(req: Request, res: Response, next: NextFunction);
}