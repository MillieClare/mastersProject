import mongoose, { Document, Schema } from 'mongoose';

export interface ISectorWord {
  sectorName: string;
  word: string;
  normalisedScore: number;
  minValue: number;
  max90Value: number;
}

export interface ISectorWordModel extends ISectorWord, Document {}

const SectorWordSchema: Schema = new Schema(
  {
    sectorName: { type: String, required: true },
    word: { type: String, required: true },
    normalisedScore: { type: Number, required: true },
    minValue: { type: Number, required: true },
    max90Value: { type: Number, required: true }
  },
  {
    versionKey: false // don't need to return the version key variable provided by mongo
  }
);

export default mongoose.model<ISectorWordModel>('SectorWord', SectorWordSchema);
