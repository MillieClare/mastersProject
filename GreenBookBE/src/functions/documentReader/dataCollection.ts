// const pdfToText = require("./../pdfReader/pdfReader");
const pdfsAsJson = require("../../assets/files/json/ICMA-Sustainable-Bonds-Database-110322.json");
const path = require("path");
import fs from "fs";

const filesToRead = fs.readdirSync(
  path.resolve(__dirname, "../../assets/files/fileOutputs")
);

const countWords = (fileToCount: any) => {
  console.log(fileToCount);
  pdfToText(`../corpus/${fileToCount}`).then(function (pdfTexts: any) {
    (fileToCount = fileToCount.toString()), fileToCount.split(" ").length;
  });
  return fileToCount;
};

export const gatherDataBaseData = (companies: Record<string, any>) => {
  companies.forEach((element: any) => {
    console.log("-------------------------", element);
    const companyTitle = element.Green_Bond_Issuer;
    const companyCountry = element.Jurisdiction;
    const companySector = element["Issuer Category/Sector"];
    const reviewCompany = element["External Review Report"];
    // let wordCount;
    // filesToRead.forEach((fileToMatch: any) => {
    //   fileToMatch = fileToMatch.split(".");
    //   if (fileToMatch[0] === element.Green_Bond_Issuer) {
    //     wordCount = countWords(fileToMatch[0]);
    //   }
    // });
    return "test";
    console.log(
      "company title ",
      companyTitle,
      "country",
      companyCountry,
      "sector ",
      companySector,
      "review ",
      reviewCompany,
      "word count "
      // wordCount
    );
    console.log("--------------------", typeof companyTitle);
    // return [companyTitle, companyCountry, companySector, reviewCompany];
  });
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
