import fs from 'fs';
import path from 'path';

import jsonFiles from '../../assets/files/json/ICMA-Sustainable-Bonds-Database-030822.json';
import topSectorWords from './topSectorWords.json';
import topSectorAlphabetical from './topSectorWordsAlphabetic.json';
import sentimentAnalysis from './sentimentAnalysisResults.json';
import jsonMongo from './JSON_for_mongo.json';
import jsonGraphMongo from './JSON_for_graph_data.json';
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
      // sentimentAnalysis: jsonGraphMongo[counter].sentimentScore
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

const getDataForScoresAndGraphs = (topSectorWordsAlphabetical: any, sentimentAnalysis: any, jsonMongoCompanyData: any) => {
  let counter = 0;
  const getResults = sentimentAnalysis.map((entry: any) => {
    const score: any = Object.values(sentimentAnalysis[counter])[1];
    const companyData = {
      companyName: Object.values(jsonMongoCompanyData[counter])[0],
      sentimentScore: score > 0 ? (score > 0.04 ? 1 : 0.5) : 0,
      sector: Object.values(jsonMongoCompanyData[counter])[2],
      topCompanyWords: Object.values(topSectorWordsAlphabetical[0])[counter]
    };
    counter++;
    return companyData;
  });
  return getResults;
};

const createJsonForGraphData = () => {
  const Json = getDataForScoresAndGraphs(topSectorAlphabetical, sentimentAnalysis, jsonMongo);
  fs.writeFile(`./JSON_for_graph_data.json`, JSON.stringify(Json), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

createJsonForGraphData();
