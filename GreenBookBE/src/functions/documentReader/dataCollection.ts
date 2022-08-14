// const pdfToText = require("./../pdfReader/pdfReader");
const pdfsAsJson = require('../../assets/files/json/ICMA-Sustainable-Bonds-Database-110322.json');
const path = require('path');
import fs from 'fs';

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
    filesToRead.forEach((fileToMatch: any) => {
      const splitFileToMatch = fileToMatch.split('.');
      if (splitFileToMatch[0] === element.Green_Bond_Issuer) {
        wordCount = fileToMatch.split(' ').length;
      }
    });
    return {
      companyName: element.Green_Bond_Issuer,
      country: element.Jurisdiction,
      sector: element['Issuer Category/Sector'],
      reviewer: element['External Review Report']
    };
  });
  return dataForMongo;
};

const dataCollection = () => {
  gatherDataBaseData(pdfsAsJson);
};

export const sum = (a: number, b: number) => {
  return a + b;
};

// module.exports = {
//   sum,
//   countWords,
//   dataCollection,
// };
