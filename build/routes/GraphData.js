"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const GraphData_1 = __importDefault(require("../controllers/GraphData"));
const router = express_1.default.Router();
router.post('/', GraphData_1.default.createGraphData);
router.get('/:graphDataId', GraphData_1.default.readGraphData);
router.get('/', GraphData_1.default.readAll);
router.patch('/:graphDataId', GraphData_1.default.updateGraphData);
router.delete('/:graphDataId', GraphData_1.default.deleteGraphData);
router.delete('/', GraphData_1.default.deleteAllGraphData);
module.exports = router;
