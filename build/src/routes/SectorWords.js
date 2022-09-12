"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const SectorWords_1 = __importDefault(require("../controllers/SectorWords"));
const router = express_1.default.Router();
router.post('/', SectorWords_1.default.createSectorWord);
router.get('/:sectorWordId', SectorWords_1.default.readSectorWord);
router.get('/', SectorWords_1.default.readAll);
router.patch('/:sectorWordId', SectorWords_1.default.updateSectorWord);
router.delete('/:sectorWordId', SectorWords_1.default.deleteSectorWord);
router.delete('/', SectorWords_1.default.deleteAllSectorWords);
module.exports = router;
