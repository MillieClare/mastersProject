import fs from 'fs';
import path from 'path';

import jsonFiles from '../../assets/files/json/ICMA-Sustainable-Bonds-Database-030822.json';
const filesToRead = fs.readdirSync(path.resolve(__dirname, '../../assets/files/fileOutputs'));

export const gatherDataBaseData = (companies: Record<string, any>) => {
  const dataForMongo = companies.map((element: any) => {
    return {
      companyName: element.Green_Bond_Issuer,
      country: element.Jurisdiction,
      sector: element['Issuer Category/Sector'],
      reviewer: element['External Review Report'],
      reviewLink: element['External_Review_Report_Hyperlink_1'] || element['External_Review_Report_Hyperlink_1'],
      marketInformationDate: element['Market Information Template'],
      marketInformationLink: element['Market Information Template Hyperlink']
    };
  });
  return dataForMongo;
};

const createJsonForMongo = () => {
  const Json = gatherDataBaseData(jsonFiles);
  fs.writeFile(`./JSON_for_mongo.json`, JSON.stringify(Json), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

createJsonForMongo();
