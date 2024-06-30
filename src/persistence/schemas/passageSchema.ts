import mongoose from "mongoose";
import { IPassagePersistence } from "../../dataschema/IPassagePersistence";

const PassageSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      required: true,
      unique: true,
    },
    buildingCode1: {
      type: String,
      required: true,
    },
    buildingCode2: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    building1_x: {
      type: Number,
      required: true,
    },
    building1_y: {
      type: Number,
      required: true,
    },
    building2_x: {
      type: Number,
      required: true,
    },
    building2_y: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPassagePersistence & mongoose.Document>(
  "Passage",
  PassageSchema
);
