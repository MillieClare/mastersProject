"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SectorWords_1 = __importDefault(require("../models/SectorWords"));
const createSectorWord = (req, res, next) => {
    const { sectorName, word, normalisedScore, minValue, max90Value } = req.body;
    const sectorWord = new SectorWords_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        sectorName,
        word,
        normalisedScore,
        minValue,
        max90Value
    });
    return sectorWord
        .save()
        .then((sectorWord) => res.status(201).json({ sectorWord }))
        .catch((error) => res.status(500).json({ error }));
};
const readSectorWord = (req, res, next) => {
    const sectorWordId = req.params.sectorWordId;
    return SectorWords_1.default.findById(sectorWordId)
        .then((sectorWord) => (sectorWord ? res.status(200).json({ sectorWord }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return SectorWords_1.default.find()
        .then((sectorWords) => res.status(200).json({ sectorWords }))
        .catch((error) => res.status(500).json({ error }));
};
const updateSectorWord = (req, res, next) => {
    const sectorWordId = req.params.sectorWordId;
    return SectorWords_1.default.findById(sectorWordId)
        .then((sectorWord) => {
        if (sectorWord) {
            sectorWord.set(req.body);
            return sectorWord
                .save()
                .then((sectorWord) => res.status(201).json({ sectorWord }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteSectorWord = (req, res, next) => {
    const sectorWordId = req.params.sectorWordId;
    return SectorWords_1.default.findByIdAndDelete(sectorWordId)
        .then((sectorWord) => (sectorWord ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const deleteAllSectorWords = (req, res, next) => {
    return SectorWords_1.default.deleteMany({})
        .then((sectorWords) => res.status(200).json({ sectorWords }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createSectorWord, readSectorWord, readAll, updateSectorWord, deleteSectorWord, deleteAllSectorWords };
