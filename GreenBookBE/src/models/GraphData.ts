import mongoose, { Document, Schema } from 'mongoose';
import { StringLiteral } from 'typescript';

export interface IGraphData {
  companyName: string;
  sentimentScore: number;
  sector: string;
  topCompanyWords: Record<string, object>;
}

export interface IGraphModel extends IGraphData, Document {}

const GraphDataSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    sentimentScore: { type: Number, required: true },
    sector: { type: String, required: true },
    topCompanyWords: { type: Schema.Types.Mixed, required: true }
  },
  {
    versionKey: false // don't need to return the version key variable provided by mongo
  }
);

export default mongoose.model<IGraphModel>('GraphData', GraphDataSchema);
