"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require("fs");
const fs_1 = __importDefault(require("fs"));
// const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const DocumentReadForTfIdf = () => {
    // list all files in directory
    const filesToRead = fs_1.default.readdirSync("../fileOutputs");
    const loadDocuments = (listOfFilesToRead, tfidfObject) => {
        listOfFilesToRead.forEach((file) => {
            try {
                const data = fs_1.default.readFileSync(`../fileOutputs/${file}`, "utf8");
                tfidfObject.addDocument(data);
            }
            catch (err) {
                console.error(err);
            }
        });
    };
    const runTfIdf = (tfidfObject) => {
        tfidfObject.tfidfs("climate", function (i, measure) {
            console.log("document #" + i + " has " + measure);
        });
    };
    const analyseDocumentScores = (documentsToAnalyse, tfidfObject) => {
        loadDocuments(documentsToAnalyse, tfidfObject);
        runTfIdf(tfidfObject);
    };
};
exports.default = DocumentReadForTfIdf;
