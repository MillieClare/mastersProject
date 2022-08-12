const pdfToText = require("./../pdfReader/pdfReader");
const pdfsAsJson = require("../../assets/files/json/ICMA-Sustainable-Bonds-Database-110322.json");
const path = require("path");
import fs from "fs";

const filesToRead = fs.readdirSync(
  // path.resolve(__dirname, "../../assets/files/output/")
  path.resolve(__dirname, "../../assets/fileOutputs")
);

const countWords = (fileToCount: any) => {
  console.log(fileToCount);
  pdfToText(`../corpus/${fileToCount}`).then(function (pdfTexts: any) {
    (fileToCount = fileToCount.toString()), fileToCount.split(" ").length;
  });
  return fileToCount;
};

const gatherDataBaseData = (companies: Record<string, any>) => {
  companies.forEach((element: any) => {
    const companyTitle = element.Green_Bond_Issuer;
    const companyCountry = element.Jurisdiction;
    const companySector = element["Issuer Category/Sector"];
    const reviewCompany = element["External Review Report"];
    let wordCount;
    filesToRead.forEach((fileToMatch: any) => {
      fileToMatch = fileToMatch.split(".");
      if (fileToMatch[0] === element.Green_Bond_Issuer) {
        wordCount = countWords(fileToMatch[0]);
      }
    });
    console.log(
      "company title ",
      companyTitle,
      "country",
      companyCountry,
      "sector ",
      companySector,
      "review ",
      reviewCompany,
      "word count ",
      wordCount
    );
  });
};

const dataCollection = () => {
  gatherDataBaseData(pdfsAsJson);
};

const sum = (a: number, b: number) => {
  return a + b;
};

module.exports = {
  sum,
  countWords,
  dataCollection,
};
