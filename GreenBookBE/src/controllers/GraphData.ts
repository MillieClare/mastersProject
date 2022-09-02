import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import GraphData from '../models/GraphData';

const createGraphData = (req: Request, res: Response, next: NextFunction) => {
  const { companyName, sentimentScore, topCompanyWords } = req.body;

  const graphData = new GraphData({
    _id: new mongoose.Types.ObjectId(),
    companyName,
    sentimentScore,
    topCompanyWords
  });

  return graphData
    .save()
    .then((graphData) => res.status(201).json({ graphData }))
    .catch((error) => res.status(500).json({ error }));
};

const readGraphData = (req: Request, res: Response, next: NextFunction) => {
  const graphDataId = req.params.graphDataId;

  return GraphData.findById(graphDataId)
    .then((graphData) => (graphData ? res.status(200).json({ graphData }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return GraphData.find()
    .then((graphData) => res.status(200).json({ graphData }))
    .catch((error) => res.status(500).json({ error }));
};

const updateGraphData = (req: Request, res: Response, next: NextFunction) => {
  const graphDataId = req.params.graphDataId;

  return GraphData.findById(graphDataId)
    .then((graphData) => {
      if (graphData) {
        graphData.set(req.body);
        return graphData
          .save()
          .then((graphData) => res.status(201).json({ graphData }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteGraphData = (req: Request, res: Response, next: NextFunction) => {
  const graphDataId = req.params.graphDataId;

  return GraphData.findByIdAndDelete(graphDataId)
    .then((graphData) => (graphData ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const deleteAllGraphData = (req: Request, res: Response, next: NextFunction) => {
  return GraphData.deleteMany({})
    .then((graphData) => res.status(200).json({ graphData }))
    .catch((error) => res.status(500).json({ error }));
};

export default { createGraphData, readGraphData, readAll, updateGraphData, deleteGraphData, deleteAllGraphData };
