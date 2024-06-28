import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';


const floor = new mongoose.Schema(
    {
        domainId: {
        type: String,
        unique: true
        },
        buildingCode: {
        type: String,
        required: [true, "Please enter building code"],
        index: true
        },
        floorNumber: {
        type: Number,
        required: [true, "Please enter floor number"],
        index: true
        },
        description: {
        type: String,
        index: true
        }
    },
    { timestamps: true }
    );

export default mongoose.model<mongoose.Document & IFloorPersistence>("Floor", floor);