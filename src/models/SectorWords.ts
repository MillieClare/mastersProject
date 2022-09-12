import mongoose, { Document, Schema } from 'mongoose';

export interface ISectorWord {
  sectorName: string;
  word: string;
  averageValue: number;
}

export interface ISectorWordModel extends ISectorWord, Document {}

const SectorWordSchema: Schema = new Schema(
  {
    sectorName: { type: String, required: true },
    word: { type: String, required: true },
    averageValue: { type: Number, required: true }
  },
  {
    versionKey: false // don't need to return the version key variable provided by mongo
  }
);

export default mongoose.model<ISectorWordModel>('SectorWord', SectorWordSchema);
