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
            averageValue: element[2]
        };
    });
    return dataForMongo;
};
exports.gatherAverageData = gatherAverageData;
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
