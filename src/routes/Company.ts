import express from 'express';
import controller from '../controllers/Company';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.company.create), controller.createCompany);
router.get('/:companyId', controller.readCompany);
router.get('/', controller.readAll);
router.patch('/:companyId', ValidateSchema(Schemas.company.update), controller.updateCompany);
router.delete('/:companyId', controller.deleteCompany);
router.delete('/', controller.deleteAllCompanies);

export = router;
