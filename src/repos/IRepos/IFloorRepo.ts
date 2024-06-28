import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor/floor";

export default interface IFloorRepo extends Repo<Floor> {
    findAll(): Promise<Floor[]>;
    existsNumber(floorNumber: number): Promise<boolean>;
    findByDomainId(id: string): Promise<Floor>;
    findByBuildingCode(code: string): Promise<Floor[]>;
    save(user: Floor): Promise<Floor>;
}