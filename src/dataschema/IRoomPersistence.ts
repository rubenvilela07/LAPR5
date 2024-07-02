export interface IRoomPersistence {
  domainId: string;
  roomName: string;
  description: string;
  buildingCode: string;
  floor:number;
  length: number;
  width: number;
  locationX: number;
  locationY: number;
  locationDoorX: number;
  locationDoorY: number;
  roomType: string;
}