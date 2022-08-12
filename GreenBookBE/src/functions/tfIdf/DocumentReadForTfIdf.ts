// const fs = require("fs");
import fs from "fs";
// const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

const DocumentReadForTfIdf = () => {
  // list all files in directory
  const filesToRead = fs.readdirSync("../fileOutputs");

  const loadDocuments = (listOfFilesToRead: [], tfidfObject: any) => {
    listOfFilesToRead.forEach((file) => {
      try {
        const data = fs.readFileSync(`../fileOutputs/${file}`, "utf8");
        tfidfObject.addDocument(data);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const runTfIdf = (tfidfObject: any) => {
    tfidfObject.tfidfs("climate", function (i: number, measure: number) {
      console.log("document #" + i + " has " + measure);
    });
  };

  const analyseDocumentScores = (documentsToAnalyse: [], tfidfObject: any) => {
    loadDocuments(documentsToAnalyse, tfidfObject);

    runTfIdf(tfidfObject);
  };
};

export default DocumentReadForTfIdf;
