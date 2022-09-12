import express from 'express';
import controller from '../controllers/SectorWords';

const router = express.Router();

router.post('/', controller.createSectorWord);
router.get('/:sectorWordId', controller.readSectorWord);
router.get('/', controller.readAll);
router.patch('/:sectorWordId', controller.updateSectorWord);
router.delete('/:sectorWordId', controller.deleteSectorWord);
router.delete('/', controller.deleteAllSectorWords);

export = router;
