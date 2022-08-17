import fs from 'fs';
import path from 'path';

import jsonFiles from '../../assets/files/json/ICMA-Sustainable-Bonds-Database-110322.json';
const filesToRead = fs.readdirSync(path.resolve(__dirname, '../../assets/files/fileOutputs'));
/** TODO: Write interface for original JSON file */

// const countWords = (fileToCount: any) => {
//   console.log(fileToCount);
//   pdfToText(`../corpus/${fileToCount}`).then(function (pdfTexts: any) {
//     (fileToCount = fileToCount.toString()), fileToCount.split(' ').length;
//   });
//   return fileToCount;
// };
export const gatherDataBaseData = (companies: Record<string, any>) => {
  const dataForMongo = companies.map((element: any) => {
    let wordCount;
    // filesToRead.forEach((fileToMatch: any) => {
    //   const splitFileToMatch = fileToMatch.split('.');
    //   console.log('hello', splitFileToMatch[0]);
    //   console.log('test2', element.Green_Bond_Issuer);
    //   console.log('test3', splitFileToMatch[0] == element.Green_Bond_Issuer);
    //   if (splitFileToMatch[0] == element.Green_Bond_Issuer) {
    //     wordCount = fileToMatch.split(' ').length;
    //     console.log('---------------------------- word count', wordCount);
    //     return wordCount;
    //   }
    // });

    return {
      companyName: element.Green_Bond_Issuer,
      country: element.Jurisdiction,
      sector: element['Issuer Category/Sector'],
      reviewer: element['External Review Report'],
      reviewLink: element['External_Review_Report_Hyperlink_1'] || element['Market Information Template Hyperlink']
      // wordCount: wordCount
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
