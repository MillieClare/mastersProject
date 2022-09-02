"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_frequencies_json_1 = __importDefault(require("./word_frequencies.json"));
const sectors = new Set(word_frequencies_json_1.default.map((element) => element.sector));
const sectorsArray = Array.from(sectors);
const getMaximumFromSector = () => {
    sectorsArray.map((sector) => {
        const reports = word_frequencies_json_1.default.filter((record) => record.sector === sector);
        console.log('=====================', reports.length);
        let allWordsArray = [];
        reports.map((entry) => {
            allWordsArray = allWordsArray.concat([entry.frequentWords]);
        });
        console.log(allWordsArray);
    });
};
const getMinimumFromSector = () => { };
function getObjKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
}
getMaximumFromSector();
