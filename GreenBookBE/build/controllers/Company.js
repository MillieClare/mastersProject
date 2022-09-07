"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Company_1 = __importDefault(require("../models/Company"));
const createCompany = (req, res, next) => {
    const { companyName, country, sector, sentimentScore, reviewer, reviewLink, marketInformationDate, marketInformationLink } = req.body;
    const company = new Company_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        companyName,
        country,
        sector,
        sentimentScore,
        reviewer,
        reviewLink,
        marketInformationDate,
        marketInformationLink
    });
    return company
        .save()
        .then((company) => res.status(201).json({ company }))
        .catch((error) => res.status(500).json({ error }));
};
const readCompany = (req, res, next) => {
    const companyId = req.params.companyId;
    return Company_1.default.findById(companyId)
        .then((company) => (company ? res.status(200).json({ company }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Company_1.default.find()
        .then((companies) => res.status(200).json({ companies }))
        .catch((error) => res.status(500).json({ error }));
};
const updateCompany = (req, res, next) => {
    const companyId = req.params.companyId;
    return Company_1.default.findById(companyId)
        .then((company) => {
        if (company) {
            company.set(req.body);
            return company
                .save()
                .then((company) => res.status(201).json({ company }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCompany = (req, res, next) => {
    const companyId = req.params.companyId;
    return Company_1.default.findByIdAndDelete(companyId)
        .then((company) => (company ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const deleteAllCompanies = (req, res, next) => {
    return Company_1.default.deleteMany({})
        .then((companies) => res.status(200).json({ companies }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createCompany, readCompany, readAll, updateCompany, deleteCompany, deleteAllCompanies };
