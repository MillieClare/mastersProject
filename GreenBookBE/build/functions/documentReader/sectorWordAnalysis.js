"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_frequencies_json_1 = __importDefault(require("./word_frequencies.json"));
const natural = require('natural');
const fs = require('fs');
const TfIdf = natural.TfIdf;
const sectors = new Set(word_frequencies_json_1.default.map((element) => element.sector));
const sectorsArray = Array.from(sectors);
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
const tfidfScores = (sectorData) => {
    const results = sectorData.map((entry) => {
        const tfidf = new TfIdf();
        const getFilesInSector = [];
        const reports = word_frequencies_json_1.default.filter((record) => record.sector === entry.sector);
        reports.map((reportToGet) => getFilesInSector.push(reportToGet.fileName + '.txt'));
        const loadDocuments = (listOfFilesToRead, tfidfObject) => {
            return new Promise((resolve, reject) => {
                listOfFilesToRead.forEach((file) => {
                    try {
                        const data = fs.readFileSync(`../../assets/files/fileOutputs/${file}`, { encoding: 'utf8', flag: 'r' });
                        tfidfObject.addDocument(data);
                    }
                    catch (err) {
                        console.error(err);
                    }
                });
                return resolve(tfidfObject);
            });
        };
        const runTfIdf = (tfidfObject) => {
            const wordsObjectArray = JSON.parse(entry.words);
            const flattenedWordsArray = Object.assign({}, ...wordsObjectArray);
            let resultsObject = {};
            getFilesInSector.map((reportName, index) => {
                resultsObject[entry.sector] = entry.sector;
                resultsObject[reportName] = {};
            });
            Object.keys(flattenedWordsArray).forEach((word, wordIndex) => {
                tfidfObject.tfidfs(word, function (i, measure) {
                    resultsObject[getFilesInSector[i]][word] = measure;
                });
            });
            return resultsObject;
        };
        const getDocuments = loadDocuments(getFilesInSector, tfidf);
        const results = runTfIdf(getDocuments);
        console.log(results);
        return results;
    });
    return results;
};
const createListOfTopSectorWords = (jsonFile) => {
    fs.writeFile(`./topSectorWords.json`, JSON.stringify(jsonFile), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
const json = tfidfScores(frequentWordsPerSector(sectorsArray));
createListOfTopSectorWords(json);
