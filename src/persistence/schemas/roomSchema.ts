import mongoose from "mongoose";
import { IRoomPersistence } from "../../dataschema/IRoomPersistence";

const RoomSchema = new mongoose.Schema(
    {
        domainId: { type: String, required: true, unique: true },
        roomName: { type: String, required: true },
        description: { type: String},
        buildingCode: { type: String, required: true },
        floor: { type: Number, required: true },
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        locationX: { type: Number, required: true },
        locationY: { type: Number, required: true },
        locationDoorX: { type: Number, required: true },
        locationDoorY: { type: Number, required: true },
        roomType: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>(
    "Room",
    RoomSchema
);