import pdfToText from "./pdfReader.ts";
import fs from "fs";
import pdfsAsJson from "../excel_pdfs/ICMA-Sustainable-Bonds-Database-110322.json";

// const fs = require("fs");
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// data to collect for database:
// - word count
// - company title
// - company country
// - review company
// - company sector
// - pdf link
// - eventually TF-IDF ratings for particular words - should the words relate to the sector?

// list all files in directory
const filesToRead = fs.readdirSync("../fileOutputs");

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

export const sum = (a: number, b: number) => {
  return a + b;
};

const countWords = (fileToCount) => {
  console.log(fileToCount);
  pdfToText(`../corpus/${fileToCount}`).then(function (pdfTexts) {
    (fileToCount = fileToCount.toString()), fileToCount.split(" ").length;
  });
  return fileToCount;
};

const DataCollection = () => {
  gatherDataBaseData(pdfsAsJson);
};

DataCollection();

export default DataCollection;
