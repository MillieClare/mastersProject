"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const JSON_average_data_for_mongo_json_1 = __importDefault(require("./JSON_average_data_for_mongo.json"));
const JSON_for_graph_data_json_1 = __importDefault(require("./JSON_for_graph_data.json"));
const getCompanyWords = (graphData) => {
    const companySpecificWords = graphData.map((company) => {
        const sectorWords = JSON_average_data_for_mongo_json_1.default.filter((element) => {
            return element.sectorName === company.sector;
        });
        const normalisedValues = sectorWords.map((word) => {
            const min = word.minValue;
            const max = word.max90Value;
            for (let wordToFind in company.topCompanyWords) {
                if (wordToFind === word.word) {
                    company.topCompanyWords[wordToFind] = (company.topCompanyWords[wordToFind] - min) / (max - min);
                    if (company.topCompanyWords[wordToFind] > 1.0) {
                        company.topCompanyWords[wordToFind] = 1.0;
                    }
                }
            }
        });
        return company;
    });
    return companySpecificWords;
};
const createJsonForNormalisedGraphData = () => {
    const Json = getCompanyWords(JSON_for_graph_data_json_1.default);
    fs_1.default.writeFile(`./JSON_for_graph_data_with_normalised_scores.json`, JSON.stringify(Json), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
createJsonForNormalisedGraphData();
