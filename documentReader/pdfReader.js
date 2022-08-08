const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
// import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
// import fs from "fs";
// import http from "http";
// import https from "https";
// import stopwords from "stopwords-en";
const fs = require("fs");
const http = require("http");
const https = require("https");
const stopwords = require("stopwords-en");
const natural = require("natural");

const PdfReader = () => {
  // list files in a directory
  const filesToRead = fs.readdirSync("../corpus");
  // import pdfsAsJson from "../excel_pdfs/ICMA-Sustainable-Bonds-Database-110322";
  const pdfsAsJson = require("../excel_pdfs/ICMA-Sustainable-Bonds-Database-110322.json");

  const getPdfs = (pdfs) => {
    pdfs.forEach((pdf) => {
      if (
        pdf.hasOwnProperty("External_Review_Report_Hyperlink_1") ||
        pdf.hasOwnProperty("External_Review_Report_Hyperlink")
      ) {
        fileName = pdf.Green_Bond_Issuer;
        fileLink =
          pdf.External_Review_Report_Hyperlink_1 ||
          pdf.External_Review_Report_Hyperlink;

        downloadPdfs(fileLink, fileName);
      }
    });
  };

  const downloadPdfs = (fileUrl, fileName) => {
    fileName = fileName.replace(/[^a-zA-Z0-9-().]/g, "");
    const isHttp = fileUrl.split(":");
    if (isHttp[0] === "http") {
      http.get(fileUrl, (res) => {
        const path = `../corpus/${fileName}.pdf`;
        const writeStream = fs.createWriteStream(path);
        res.pipe(writeStream);
        writeStream.on("finish", () => {
          writeStream.close();
          console.log("------------Download Completed!");
        });
      });
    } else if (isHttp[0] === "https") {
      https.get(fileUrl, (res) => {
        const path = `../corpus/${fileName}.pdf`;
        const writeStream = fs.createWriteStream(path);
        res.pipe(writeStream);
        writeStream.on("finish", () => {
          writeStream.close();
          console.log("------------Download Completed!");
        });
      });
    } else {
      console.log("Error, file is neither http or https", fileName);
    }
  };

  const pdfToText = (url, separator = " ") => {
    let pdf = pdfjsLib.getDocument(url);
    return pdf.promise.then(function (pdf) {
      // get all pages text
      let maxPages = pdf._pdfInfo.numPages;
      let countPromises = []; // collecting all page promises
      for (let i = 1; i <= maxPages; i++) {
        let page = pdf.getPage(i);
        countPromises.push(
          page.then(function (page) {
            // add page promise
            let textContent = page.getTextContent();
            return textContent.then(function (text) {
              // return content promise
              return text.items
                .map(function (obj) {
                  return obj.str;
                })
                .join(separator); // value page text
            });
          })
        );
      }
      // wait for all pages and join text
      return Promise.all(countPromises).then(function (texts) {
        for (let i = 0; i < texts.length; i++) {
          texts[i] = texts[i].replace(/\s+/g, " ").trim();
        }
        return texts;
      });
    });
  };

  // const removeStopwords = (text) => {
  //     const res = [];
  //     const words = text.split(" ");
  //     for (let i = 0; i < words.length; i++) {
  //         let checkWord = words[i].split(".").join("");
  //         if (!stopwords.includes(checkWord)) {
  //             res.push(checkWord);
  //         }
  //     }
  //     return res.join(" ");
  // };

  // const stemOutput = (text) => {
  //     const stemmer = natural.LancasterStemmer;
  //     console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
  //     const stemmedText = [...new Set(stemmer.tokenizeAndStem(text))];
  //     return stemmedText.join(" ");
  // };

  const updateTextFiles = (listOfFiles) => {
    listOfFiles.forEach((file) => {
      pdfToText(`../corpus/${file}`).then(
        function (pdfTexts) {
          const txtFileName = file.split(".")[0];
          pdfTexts = pdfTexts.toString();
          // console.log(countWords(pdfTexts));

          // pdfTexts = removeStopwords(pdfTexts);
          // pdfTexts = stemOutput(pdfTexts);
          // console.log(pdfTexts);
          fs.writeFile(
            `../fileOutputs/${txtFileName}.txt`,
            pdfTexts.toString(),
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
        },
        function (reason) {
          console.error(reason);
        }
      );
    });
  };
};

export default PdfReader;
