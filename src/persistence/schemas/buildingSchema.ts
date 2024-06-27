import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const Building = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    name: {
      type: String,
      index: true,
    },

    code: {
      type: String,
      required: [true, 'Please enter building code'],
      index: true,
      unique: true,
    },

    description: {
      type: String,
      index: true,
    },

    length: {
      type: Number,
      required: [true, 'Please enter building length'],
      index: true,
    },

    width: {
      type: Number,
      required: [true, 'Please enter building width'],
      index: true,
    },
    numberOfFloors: {
      type: Number,
      required: [true, 'Please enter number of floors'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);
