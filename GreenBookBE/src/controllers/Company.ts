import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Company from '../models/Company';

const createCompany = (req: Request, res: Response, next: NextFunction) => {
  const { companyName, country, sector, sentimentScore, reviewer, reviewLink, marketInformationDate, marketInformationLink } = req.body;

  const company = new Company({
    _id: new mongoose.Types.ObjectId(),
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

const readCompany = (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.params.companyId;

  return Company.findById(companyId)
    .then((company) => (company ? res.status(200).json({ company }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Company.find()
    .then((companies) => res.status(200).json({ companies }))
    .catch((error) => res.status(500).json({ error }));
};

const updateCompany = (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.params.companyId;

  return Company.findById(companyId)
    .then((company) => {
      if (company) {
        company.set(req.body);
        return company
          .save()
          .then((company) => res.status(201).json({ company }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteCompany = (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.params.companyId;

  return Company.findByIdAndDelete(companyId)
    .then((company) => (company ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const deleteAllCompanies = (req: Request, res: Response, next: NextFunction) => {
  return Company.deleteMany({})
    .then((companies) => res.status(200).json({ companies }))
    .catch((error) => res.status(500).json({ error }));
};

export default { createCompany, readCompany, readAll, updateCompany, deleteCompany, deleteAllCompanies };
