import mongoose, { Document, Schema } from 'mongoose';

export interface IGraphData {
  companyName: string;
  sentimentScore: number;
  topCompanyWords: {
    [key: string]: string;
  };
}

export interface IGraphDataModel extends IGraphData, Document {}

const GraphSchema: Schema = new Schema({
  companyName: { type: String, required: true, ref: 'companyName' },
  sentimentScore: { type: Number, required: true },
  topCompanyWords: { type: Schema.Types.Mixed, required: true }
});

export default mongoose.model<IGraphDataModel>('GraphData', GraphSchema);
