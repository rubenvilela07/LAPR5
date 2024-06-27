import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building/building";

export default interface IBuildingRepo extends Repo<Building> {
    existsCode(code: string): Promise<boolean>;
    findByDomainId(id: string): Promise<Building>;
	save(user: Building): Promise<Building>;
}
  