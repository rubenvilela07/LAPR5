import { Service, Inject } from "typedi";

import { Document, FilterQuery, Model } from "mongoose";
import { IPassagePersistence } from "../dataschema/IPassagePersistence";
import { Passage } from "../domain/passage/passage";
import { PassageId } from "../domain/passage/passageId";
import { PassageMap } from "../mappers/PassageMap";
import IPassageRepo from "./IRepos/IPassageRepo";

@Service()
export default class PassageRepo implements IPassageRepo {
  constructor(
    @Inject("passageSchema")
    private passageSchema: Model<IPassagePersistence & Document>
  ) {}


  public async exists(t: Passage): Promise<boolean> {
    const idX = t.id.toString();
    const query = { domainId: idX };
    const passageDocument = await this.passageSchema.findOne(query);
    return !!passageDocument === true;
  }
  save(t: Passage): Promise<Passage> {
    throw new Error("Method not implemented.");
  }


}
