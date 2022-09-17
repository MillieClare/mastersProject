import fs from 'fs';
import path from 'path';

import pythonAverageData from './JSON_average_data_for_mongo.json';
import graphData from './JSON_for_graph_data.json';

interface pythonAverageTypes {
  sectorName: string;
  word: string;
  normalisedScore: number;
  minValue: number;
  max90Value: number;
}

interface graphDataTypes {
  companyName: string;
  sentimentScore: number;
  sector: string;
  topCompanyWords: Record<string, number>;
}

const getCompanyWords = (graphData: any) => {
  const companySpecificWords = graphData.map((company: graphDataTypes) => {
    const sectorWords = pythonAverageData.filter((element: pythonAverageTypes) => {
      return element.sectorName === company.sector;
    });
    const normalisedValues = sectorWords.map((word: pythonAverageTypes) => {
      const min = word.minValue;
      const max = word.max90Value;
      for (let wordToFind in company.topCompanyWords) {
        if (wordToFind === word.word) {
          company.topCompanyWords[wordToFind] = (company.topCompanyWords[wordToFind] - min) / (max - min);
          if (company.topCompanyWords[wordToFind] > 1.0) {
            company.topCompanyWords[wordToFind] = 1.0;
          }
        }
      }
    });
    return company;
  });
  return companySpecificWords;
};

const createJsonForNormalisedGraphData = () => {
  const Json = getCompanyWords(graphData);
  fs.writeFile(`./JSON_for_graph_data_with_normalised_scores.json`, JSON.stringify(Json), (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

createJsonForNormalisedGraphData();
