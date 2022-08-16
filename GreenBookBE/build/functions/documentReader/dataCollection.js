"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherDataBaseData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ICMA_Sustainable_Bonds_Database_110322_json_1 = __importDefault(require("../../assets/files/json/ICMA-Sustainable-Bonds-Database-110322.json"));
const filesToRead = fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../../assets/files/fileOutputs'));
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
/** TODO: Write interface for original JSON file */
// const countWords = (fileToCount: any) => {
//   console.log(fileToCount);
//   pdfToText(`../corpus/${fileToCount}`).then(function (pdfTexts: any) {
//     (fileToCount = fileToCount.toString()), fileToCount.split(' ').length;
//   });
//   return fileToCount;
// };
const gatherDataBaseData = (companies) => {
    const dataForMongo = companies.map((element) => {
        let wordCount;
        // filesToRead.forEach((fileToMatch: any) => {
        //   const splitFileToMatch = fileToMatch.split('.');
        //   console.log('hello', splitFileToMatch[0]);
        //   console.log('test2', element.Green_Bond_Issuer);
        //   console.log('test3', splitFileToMatch[0] == element.Green_Bond_Issuer);
        //   if (splitFileToMatch[0] == element.Green_Bond_Issuer) {
        //     wordCount = fileToMatch.split(' ').length;
        //     console.log('---------------------------- word count', wordCount);
        //     return wordCount;
        //   }
        // });
        return {
            companyName: element.Green_Bond_Issuer,
            country: element.Jurisdiction,
            sector: element['Issuer Category/Sector'],
            reviewer: element['External Review Report']
            // wordCount: wordCount
        };
    });
    return dataForMongo;
};
exports.gatherDataBaseData = gatherDataBaseData;
const createJsonForMongo = () => {
    const Json = (0, exports.gatherDataBaseData)(ICMA_Sustainable_Bonds_Database_110322_json_1.default);
    fs_1.default.writeFile(`./JSON_for_mongo.json`, JSON.stringify(Json), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
//createJsonForMongo();
const postDataToMongo = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:2107/companies/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ companyName: 'ABANCA Corporación Bancaria, S. A.', country: 'Spain', sector: 'Financial Institution', reviewer: 'SUSTAINALYTICS' }));
};
postDataToMongo();
