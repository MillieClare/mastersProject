import fs from 'fs';
import path from 'path';

import pythonAverageData from './python_JSON_sector_averages.json';

export const gatherAverageData = (data: any) => {
  const dataForMongo = data.map((element: any) => {
    return {
      sectorName: element[0],
      word: element[1],
      averageValue: element[2]
    };
  });
  return dataForMongo;
};

const createAverageDataJsonForMongo = () => {
  const Json = gatherAverageData(pythonAverageData);
  fs.writeFile(`./JSON_average_data_for_mongo.json`, JSON.stringify(Json), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

createAverageDataJsonForMongo();
