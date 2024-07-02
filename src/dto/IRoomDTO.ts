export default interface IRoomDTO {
  id: string;
  roomName: string;
  description: string;
  length: number;
  width: number;
  buildingCode: string;
  floor: number;
  locationX: number;
  locationY: number;
  locationDoorX: number;
  locationDoorY: number;
  roomType: "Gabinete" | "Anfiteatro" | "Laboratorio" | "Outro";
}
