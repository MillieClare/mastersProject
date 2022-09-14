"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherAverageData = void 0;
const fs_1 = __importDefault(require("fs"));
const python_JSON_sector_averages_json_1 = __importDefault(require("./python_JSON_sector_averages.json"));
const gatherAverageData = (data) => {
    const dataForMongo = data.map((element) => {
        return {
            sectorName: element[0],
            word: element[1],
            normalisedScore: element[2],
            minValue: element[3],
            max90Value: element[4]
        };
    });
    return dataForMongo;
};
exports.gatherAverageData = gatherAverageData;
// console.log(gatherAverageData(pythonAverageData));
const createAverageDataJsonForMongo = () => {
    const Json = (0, exports.gatherAverageData)(python_JSON_sector_averages_json_1.default);
    fs_1.default.writeFile(`./JSON_average_data_for_mongo.json`, JSON.stringify(Json), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
createAverageDataJsonForMongo();
