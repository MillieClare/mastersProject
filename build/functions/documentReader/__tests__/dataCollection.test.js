"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataCollection_1 = require("../dataCollection");
const averageDataProcessing_1 = require("../averageDataProcessing");
const mockData_json_1 = __importDefault(require("./mockData.json"));
const mockAverageDataProcessing = [['Agency', 'climate', 0.3739279588, 4.5649431151, 52.9533401346]];
test('return the correct data', () => {
    const results = (0, dataCollection_1.gatherDataBaseData)(mockData_json_1.default);
    expect(results).toStrictEqual([
        {
            companyName: 'ABANCA Corporación Bancaria, S. A.',
            country: 'Spain',
            sector: 'Financial Institution',
            reviewer: 'SUSTAINALYTICS',
            reviewLink: 'https://www.icmagroup.org/Emails/icma-vcards/Abanca_External%20Review%20Report.pdf',
            marketInformationDate: 'September 2021',
            marketInformationLink: 'https://www.icmagroup.org/Emails/icma-vcards/Abanca%20-%20Market%20Information%20Template_Green%20Bonds.pdf'
        }
    ]);
});
// tests
// averageDataProcessing
// pass in a data object, returns correctly formatted object
test('when given an array the function returns objects in correct formant', () => {
    const result = (0, averageDataProcessing_1.gatherAverageData)(mockAverageDataProcessing);
    expect(result).toEqual([{ sectorName: 'Agency', word: 'climate', normalisedScore: 0.3739279588, minValue: 4.5649431151, max90Value: 52.9533401346 }]);
});
// dataCollection
// pass in three mock objects, returns correctly formatted object
// postDataToMongo
// no idea tbh - I can verify that postman gets the data?
// sectorWordAnalysis
// cutObject - returns array of objects of a certain length
// sentiment analysis
// give them text, get back score pos & neg?
// text analysis
// count words?
// max values
