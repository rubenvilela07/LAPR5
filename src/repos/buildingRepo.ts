import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { Building } from '../domain/building/building';
import { BuildingCode } from '../domain/building/buildingCode';
import { BuildingMap } from '../mappers/BuildingMap';

@Service()
export default class BuildingRepo implements IBuildingRepo {


  constructor(
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
  ) { }

  public async exists (building: Building): Promise<boolean> {
    const idX = building.id.toString();
    const query = { domainId: idX };
    const buildingDocument = await this.buildingSchema.findOne(
      query
    );

    return !!buildingDocument === true;
  }

  public async save (building: Building): Promise<Building> {
    const query = { domainId: building.id.toString()};
    const buildingDocument = await this.buildingSchema.findOne(
      query
    );

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);
        const buildingCreated = await this.buildingSchema.create(rawBuilding);
        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.name = building.name;
        buildingDocument.code = building.code.code;
        buildingDocument.description = building.description;
        buildingDocument.length = building.dimension.length;
        buildingDocument.width = building.dimension.width;

        await buildingDocument.save();
        return building;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findByDomainId (id: string): Promise<Building> {
    const query = { domainId: id};
    const buildingRecord = await this.buildingSchema.findOne(
      query
    ) as IBuildingPersistence & Document;

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    return null;
  }

  public async existsCode(code: string): Promise<boolean> {
    const query = { code: code };
    const buildingDocument = await this.buildingSchema.findOne(query);
    return !!buildingDocument;
  }

  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();
    return buildingRecords.map((buildingRecord) => BuildingMap.toDomain(buildingRecord));
  }

  public  async findByCode(code: string): Promise<Building> {
    const query = { code: code };
    const buildingRecord = await this.buildingSchema.findOne
    (query) as IBuildingPersistence & Document;
    
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    return null;
  }
}