import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
export default interface IPassageController {
  listPassages(req: Request, res: Response, next: NextFunction);
  createPassage(req: Request, res: Response, next: NextFunction);
  updatePassage(req: Request, res: Response, next: NextFunction);
}
