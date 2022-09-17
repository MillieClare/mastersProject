"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Company_1 = __importDefault(require("../controllers/Company"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.company.create), Company_1.default.createCompany);
router.get('/:companyId', Company_1.default.readCompany);
router.get('/', Company_1.default.readAll);
router.patch('/:companyId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.company.update), Company_1.default.updateCompany);
router.delete('/:companyId', Company_1.default.deleteCompany);
router.delete('/', Company_1.default.deleteAllCompanies);
module.exports = router;
