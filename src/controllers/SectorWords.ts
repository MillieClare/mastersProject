import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import SectorWord from '../models/SectorWords';

const createSectorWord = (req: Request, res: Response, next: NextFunction) => {
  const { sectorName, word, normalisedScore, minValue, max90Value } = req.body;

  const sectorWord = new SectorWord({
    _id: new mongoose.Types.ObjectId(),
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

const readSectorWord = (req: Request, res: Response, next: NextFunction) => {
  const sectorWordId = req.params.sectorWordId;

  return SectorWord.findById(sectorWordId)
    .then((sectorWord) => (sectorWord ? res.status(200).json({ sectorWord }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return SectorWord.find()
    .then((sectorWords) => res.status(200).json({ sectorWords }))
    .catch((error) => res.status(500).json({ error }));
};

const updateSectorWord = (req: Request, res: Response, next: NextFunction) => {
  const sectorWordId = req.params.sectorWordId;

  return SectorWord.findById(sectorWordId)
    .then((sectorWord) => {
      if (sectorWord) {
        sectorWord.set(req.body);
        return sectorWord
          .save()
          .then((sectorWord) => res.status(201).json({ sectorWord }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteSectorWord = (req: Request, res: Response, next: NextFunction) => {
  const sectorWordId = req.params.sectorWordId;

  return SectorWord.findByIdAndDelete(sectorWordId)
    .then((sectorWord) => (sectorWord ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const deleteAllSectorWords = (req: Request, res: Response, next: NextFunction) => {
  return SectorWord.deleteMany({})
    .then((sectorWords) => res.status(200).json({ sectorWords }))
    .catch((error) => res.status(500).json({ error }));
};

export default { createSectorWord, readSectorWord, readAll, updateSectorWord, deleteSectorWord, deleteAllSectorWords };
