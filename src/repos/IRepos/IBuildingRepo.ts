import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building/building";

export default interface IBuildingRepo extends Repo<Building> {
    findAll(): Promise<Building[]>;
    existsCode(code: string): Promise<boolean>;
    findByDomainId(id: string): Promise<Building>;
	save(user: Building): Promise<Building>;
    findByCode(code: string): Promise<Building>;
}
  