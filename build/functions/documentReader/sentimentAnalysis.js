"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const filesToRead = fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../../assets/files/fileOutputs'));
const getSentimentScore = (filesToRead) => {
    const scorePerDocument = filesToRead.map((element, index) => {
        const elementContents = fs_1.default.readFileSync(`../../assets/files/fileOutputs/${element}`, 'utf-8');
        const result = sentiment.analyze(elementContents);
        const resultObject = {
            companyName: element.split('.txt')[0],
            sentimentScore: result.comparative
        };
        return resultObject;
    });
    return scorePerDocument;
};
const createListOfSentimentScores = (jsonFile) => {
    fs_1.default.writeFile(`./sentimentAnalysisResults.json`, JSON.stringify(jsonFile), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
const json = getSentimentScore(filesToRead);
createListOfSentimentScores(json);
