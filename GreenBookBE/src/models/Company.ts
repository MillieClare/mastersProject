import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany {
  companyName: string;
  country: string;
  sector: string;
  reviewer: string;
  reviewLink: string;
  marketInformationDate: string;
  marketInformationLink: string;
}

export interface ICompanyModel extends ICompany, Document {}

const CompanySchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    country: { type: String, required: true },
    sector: { type: String, required: true },
    reviewer: { type: String, required: true },
    reviewLink: { type: String, required: false },
    marketInformationDate: { type: String, required: false },
    marketInformationLink: { type: String, required: false }
  },
  {
    versionKey: false // don't need to return the version key variable provided by mongo
  }
);

export default mongoose.model<ICompanyModel>('Company', CompanySchema);
