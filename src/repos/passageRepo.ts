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

  public async findByDomainId(id: PassageId): Promise<Passage> {
    const query = { domainId: id.toString() };
    const passageRecord = await this.passageSchema.findOne
    (query) as IPassagePersistence & Document;
    if (passageRecord == null) return null;
    return PassageMap.toDomain(passageRecord);
  }

  public async save(t: Passage): Promise<Passage> {
    const query = { domainId: t.id.toString() };
    const passageDocument = await this.passageSchema.findOne(query);
    try {
      if (passageDocument === null) {
        const rawPassage: any = PassageMap.toPersistence(t);
        const passageCreated = await this.passageSchema.create(rawPassage);
        return PassageMap.toDomain(passageCreated);
      } else {
        passageDocument.building1_x = t.building1_x;
        passageDocument.building1_y = t.building1_y;
        passageDocument.building2_x = t.building2_x;
        passageDocument.building2_y = t.building2_y;
        passageDocument.floor = t.floor;
        passageDocument.buildingCode1 = t.buildingCode1.code;
        passageDocument.buildingCode2 = t.buildingCode2.code;
        
        await passageDocument.save();
        return PassageMap.toDomain(passageDocument);
      }
    } catch (err) {
      throw err;
    }
  }




}
