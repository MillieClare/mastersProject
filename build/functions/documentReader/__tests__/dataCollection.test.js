"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataCollection_1 = require("../dataCollection");
const mockData_json_1 = __importDefault(require("./mockData.json"));
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
test('return the correct data', () => {
    const results = (0, dataCollection_1.gatherDataBaseData)(mockData_json_1.default);
    // console.log('-------- results', results);
    expect(results).toStrictEqual([{ companyName: 'ABN AMRO (2015)', country: 'Netherlands', reviewer: 'oekom research', sector: 'Financial Institution' }]);
});
