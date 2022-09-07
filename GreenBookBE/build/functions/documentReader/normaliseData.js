"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JSON_for_graph_data_json_1 = __importDefault(require("./JSON_for_graph_data.json"));
const sectors = new Set(JSON_for_graph_data_json_1.default.map((element) => element.sector));
const sectorsArray = Array.from(sectors);
const range = [0, 1];
const normaliseObject = (data, range) => {
    let minMax = { min: null, max: null };
    Object.keys(data).forEach((key) => {
        const values = Object.values(data[key]);
        const min = Math.min.apply(Math, values);
        const max = Math.max.apply(Math, values);
        if (min < minMax.min || minMax.min === null) {
            minMax.min = min;
        }
        if (max > minMax.max || minMax.max === null) {
            minMax.max = max;
        }
    });
    const variation = (range[1] - range[0]) / (minMax.max - minMax.min);
    Object.keys(data).forEach((key) => {
        Object.keys(data[key]).forEach((el) => {
            const val = (range[0] + (data[key][el] - minMax.min) * variation).toFixed(2);
            data[key][el] = +val;
        });
    });
};
const createDataObject = (sectors) => {
    const sectorWords = sectors.map((sector) => {
        const currentSectorRecords = JSON_for_graph_data_json_1.default.filter((element) => element.sector === sector);
        // console.log('sector------------------', sector);
        const mapReportsForTopWords = currentSectorRecords.map((report) => {
            // console.log('report -----------------------', report);
            const sectorWords = report.topCompanyWords;
            const companyName = report.companyName;
            const dataObj = {
                companyName: sectorWords
            };
            normaliseObject(dataObj, range);
            return normaliseObject;
        });
        return mapReportsForTopWords;
    });
    return sectorWords;
};
console.log(createDataObject(sectorsArray));
// normaliseObject(dataObj, range);
// console.log(dataObj);
