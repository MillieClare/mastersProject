import { pdfToText } from "../documentReader/pdfReader.js";
import fs from "fs";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
// const fs = require("fs");
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// data to collect for database:
// - word count
// - company title
// - company country
// - review company
// - company sector
// - eventually TF-IDF ratings for particular words - should the words relate to the sector?

const DataCollection = () => {
  // list all files in directory
  const filesToRead = fs.readdirSync("../fileOutputs");
  const pdfsAsJson = require("../excel_pdfs/ICMA-Sustainable-Bonds-Database-110322");

  const gatherDataBaseData = (companies) => {
    companies.forEach((element) => {
      const companyTitle = element.Green_Bond_Issuer;
      const companyCountry = element.Jurisdiction;
      const companySector = element["Issuer Category/Sector"];
      const reviewCompany = element["External Review Report"];
      let wordCount;
      filesToRead.forEach((fileToMatch) => {
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
  const countWords = (fileToCount) => {
    console.log(fileToCount);
    pdfToText(`../corpus/${fileToCount}`).then(function (pdfTexts) {
      (fileToCount = fileToCount.toString()), fileToCount.split(" ").length;
    });
    return fileToCount;
  };
};

export default DataCollection;
