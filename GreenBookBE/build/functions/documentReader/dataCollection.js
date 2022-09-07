"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherDataBaseData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ICMA_Sustainable_Bonds_Database_030822_json_1 = __importDefault(require("../../assets/files/json/ICMA-Sustainable-Bonds-Database-030822.json"));
const topSectorWordsAlphabetic_json_1 = __importDefault(require("./topSectorWordsAlphabetic.json"));
const sentimentAnalysisResults_json_1 = __importDefault(require("./sentimentAnalysisResults.json"));
const JSON_for_mongo_json_1 = __importDefault(require("./JSON_for_mongo.json"));
const filesToRead = fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../../assets/files/fileOutputs'));
const gatherDataBaseData = (companies) => {
    const dataForMongo = companies.map((element) => {
        return {
            companyName: element.Green_Bond_Issuer,
            country: element.Jurisdiction,
            sector: element['Issuer Category/Sector'],
            reviewer: element['External Review Report'],
            reviewLink: element['External_Review_Report_Hyperlink_1'] || element['External_Review_Report_Hyperlink_1'],
            marketInformationDate: element['Market Information Template'],
            marketInformationLink: element['Market Information Template Hyperlink']
            // sentimentAnalysis: jsonGraphMongo[counter].sentimentScore
        };
    });
    return dataForMongo;
};
exports.gatherDataBaseData = gatherDataBaseData;
const createJsonForMongo = () => {
    const Json = (0, exports.gatherDataBaseData)(ICMA_Sustainable_Bonds_Database_030822_json_1.default);
    fs_1.default.writeFile(`./JSON_for_mongo.json`, JSON.stringify(Json), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
createJsonForMongo();
const getDataForScoresAndGraphs = (topSectorWordsAlphabetical, sentimentAnalysis, jsonMongoCompanyData) => {
    let counter = 0;
    const getResults = sentimentAnalysis.map((entry) => {
        const score = Object.values(sentimentAnalysis[counter])[1];
        const companyData = {
            companyName: Object.values(jsonMongoCompanyData[counter])[0],
            sentimentScore: score > 0 ? (score > 0.04 ? 1 : 0.5) : 0,
            sector: Object.values(jsonMongoCompanyData[counter])[2],
            topCompanyWords: Object.values(topSectorWordsAlphabetical[0])[counter]
        };
        counter++;
        return companyData;
    });
    return getResults;
};
const createJsonForGraphData = () => {
    const Json = getDataForScoresAndGraphs(topSectorWordsAlphabetic_json_1.default, sentimentAnalysisResults_json_1.default, JSON_for_mongo_json_1.default);
    fs_1.default.writeFile(`./JSON_for_graph_data.json`, JSON.stringify(Json), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
createJsonForGraphData();
