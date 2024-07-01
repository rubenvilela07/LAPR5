import { Repo } from "../../core/infra/Repo";
import { Passage } from "../../domain/passage/passage";

export default interface IPassageRepo extends Repo<Passage> {
  findByDomainId(id: string): Promise<Passage>;
  findAll(): Promise<Passage[]>;

}
