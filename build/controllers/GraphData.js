"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GraphData_1 = __importDefault(require("../models/GraphData"));
const createGraphData = (req, res, next) => {
    const { companyName, sentimentScore, topCompanyWords } = req.body;
    const graphData = new GraphData_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        companyName,
        sentimentScore,
        topCompanyWords
    });
    return graphData
        .save()
        .then((graphData) => res.status(201).json({ graphData }))
        .catch((error) => res.status(500).json({ error }));
};
const readGraphData = (req, res, next) => {
    const graphDataId = req.params.graphDataId;
    return GraphData_1.default.findById(graphDataId)
        .then((graphData) => (graphData ? res.status(200).json({ graphData }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return GraphData_1.default.find()
        .then((graphData) => res.status(200).json({ graphData }))
        .catch((error) => res.status(500).json({ error }));
};
const updateGraphData = (req, res, next) => {
    const graphDataId = req.params.graphDataId;
    return GraphData_1.default.findById(graphDataId)
        .then((graphData) => {
        if (graphData) {
            graphData.set(req.body);
            return graphData
                .save()
                .then((graphData) => res.status(201).json({ graphData }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteGraphData = (req, res, next) => {
    const graphDataId = req.params.graphDataId;
    return GraphData_1.default.findByIdAndDelete(graphDataId)
        .then((graphData) => (graphData ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const deleteAllGraphData = (req, res, next) => {
    return GraphData_1.default.deleteMany({})
        .then((graphData) => res.status(200).json({ graphData }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createGraphData, readGraphData, readAll, updateGraphData, deleteGraphData, deleteAllGraphData };
