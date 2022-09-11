import express from 'express';
import controller from '../controllers/GraphData';

const router = express.Router();

router.post('/', controller.createGraphData);
router.get('/:graphDataId', controller.readGraphData);
router.get('/', controller.readAll);
router.patch('/:graphDataId', controller.updateGraphData);
router.delete('/:graphDataId', controller.deleteGraphData);
router.delete('/', controller.deleteAllGraphData);

export = router;
