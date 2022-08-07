// import { pdfToText } from "../documentReader/pdfReader.js";
const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// data to collect for database:
// - word count
// - company title
// - company country
// - review company
// - company sector
// - eventually TF-IDF ratings for particular words - should the words relate to the sector?

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
    pdfToText(`../corpus/${fileToCount}`).then(function(pdfTexts) {
        (fileToCount = fileToCount.toString()), fileToCount.split(" ").length;
    });
    return fileToCount;
};

// TODO: work out a way to not duplicate code
const pdfToText = (url, separator = " ") => {
    let pdf = pdfjsLib.getDocument(url);
    return pdf.promise.then(function(pdf) {
        // get all pages text
        let maxPages = pdf._pdfInfo.numPages;
        let countPromises = []; // collecting all page promises
        for (let i = 1; i <= maxPages; i++) {
            let page = pdf.getPage(i);
            countPromises.push(
                page.then(function(page) {
                    // add page promise
                    let textContent = page.getTextContent();
                    return textContent.then(function(text) {
                        // return content promise
                        return text.items
                            .map(function(obj) {
                                return obj.str;
                            })
                            .join(separator); // value page text
                    });
                })
            );
        }
        // wait for all pages and join text
        return Promise.all(countPromises).then(function(texts) {
            for (let i = 0; i < texts.length; i++) {
                texts[i] = texts[i].replace(/\s+/g, " ").trim();
            }
            return texts;
        });
    });
};

gatherDataBaseData(pdfsAsJson);