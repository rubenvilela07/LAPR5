import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { Floor } from '../domain/floor/floor';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorRepo from './IRepos/IFloorRepo';
import { FloorMap } from '../mappers/FloorMap';

@Service()
export default class FloorRepo implements IFloorRepo {
  constructor(
    @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
  ) { }

  public async exists (floor: Floor): Promise<boolean> {
    const idX = floor.id.toString();
    const query = { domainId: idX };
    const buildingDocument = await this.floorSchema.findOne(
      query
    );

    return !!buildingDocument === true;
  }

  public async save (floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString()};
    const floorComponent = await this.floorSchema.findOne(
      query
    );

    try {
      if (floorComponent === null) {
        const rawFloor: any = FloorMap.toPersistence(floor);
        const floorCreated = await this.floorSchema.create(rawFloor);
        return FloorMap.toDomain(floorCreated);
      } else {
        floorComponent.floorNumber = floor.floorNumber;
        floorComponent.description = floor.description;
        floorComponent.buildingCode = floor.buildingCode.code;

        await floorComponent.save();
        return floor;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findByBuildingCode (code: string): Promise<Floor[]> {
    const query = { buildingCode: code};
    const floorRecords = await this.floorSchema.find(
      query
    ) as IFloorPersistence & Document[];

    if (floorRecords != null) {
      return floorRecords.map(FloorMap.toDomain);
    }
    return null;
  }


  public async findByDomainId (id: string): Promise<Floor> {
    const query = { domainId: id};
    const buildingRecord = await this.floorSchema.findOne(
      query
    ) as IFloorPersistence & Document;

    if (buildingRecord != null) {
      return FloorMap.toDomain(buildingRecord);
    }
    return null;
  }


  public async findAll(): Promise<Floor[]> {
    const floorRecords = await this.floorSchema.find();
    return floorRecords.map((floorRecord) => FloorMap.toDomain(floorRecord));     
  }


  public async existsNumber(floorNumber: number): Promise<boolean> {
    const query = { floorNumber: floorNumber };
    const floorDocument = await this.floorSchema.findOne(query);
    return !!floorDocument;
  }
}