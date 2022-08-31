"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_frequencies_json_1 = __importDefault(require("./word_frequencies.json"));
const natural = require('natural');
const fs = require('fs');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const sectors = new Set(word_frequencies_json_1.default.map((element) => element.sector));
const sectorsArray = Array.from(sectors);
// console.log(sectors);
const frequentWordsPerSector = (sectors) => {
    const wordFrequenciesPerSector = sectors.map((sector) => {
        const reports = word_frequencies_json_1.default.filter((record) => record.sector === sector);
        const reportWords = reports.map((element) => JSON.parse(element.frequentWords));
        const wordArray = [];
        reportWords.map((object) => {
            object.map((element) => wordArray.push(element));
        });
        const totals = wordArray.reduce((a, obj) => {
            const [k, v] = Object.entries(obj)[0];
            a[k] = (a[k] || 0) + v;
            return a;
        }, {});
        // console.log('totals', totals);
        const totalsSorted = Object.fromEntries(Object.entries(totals).sort(([, a], [, b]) => b - a));
        const cutObject = (obj, max) => Object.keys(obj)
            .filter((key, index) => index < max)
            .map((key) => ({
            [key]: obj[key]
        }));
        const topSixWordsPerSector = {
            sector: sector,
            words: JSON.stringify(cutObject(totalsSorted, 6))
        };
        return topSixWordsPerSector;
    });
    return wordFrequenciesPerSector;
};
const tfidfForTopWordsWithinSectors = (sectors) => {
    const tfidfScores = sectors.map((sector) => {
        const reports = word_frequencies_json_1.default.filter((record) => record.sector === sector);
        const getFilesInSector = [];
        reports.map((reportToGet) => getFilesInSector.push(reportToGet.fileName + '.txt'));
        // console.log(getFilesInSector);
        const loadDocuments = (listOfFilesToRead, tfidfObject) => {
            console.log(tfidfObject.documents.length());
            // console.log('===========================list of files to read', listOfFilesToRead);
            // console.log({ listOfFilesToRead });
            listOfFilesToRead.forEach((file) => {
                // console.log({ file });
                try {
                    const data = fs.readFileSync(`../../assets/files/fileOutputs/${file}`, { encoding: 'utf8', flag: 'r' });
                    tfidfObject.addDocument(data);
                    // console.log({ data });
                }
                catch (err) {
                    console.error(err);
                }
            });
        };
        const runTfIdf = (tfidfObject) => {
            tfidfObject.tfidfs('climate', function (i, measure) {
                // console.log('document #' + i + ' has ' + measure);
            });
        };
        const analyseDocumentScores = (documentsToAnalyse, tfidfObject) => {
            console.log('before**************************************************************************************************************************', tfidfObject);
            loadDocuments(documentsToAnalyse, tfidfObject);
            console.log('after**************************************************************************************************************************', tfidfObject);
            runTfIdf(tfidfObject);
        };
        analyseDocumentScores(getFilesInSector, tfidf);
    });
};
tfidfForTopWordsWithinSectors(sectorsArray);
// console.log(frequentWordsPerSector(sectorsArray));
