import express from 'express';
import controller from '../controllers/Company';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.company.create), controller.createCompany);
router.get('/get/:companyId', controller.readCompany);
router.get('/get/', controller.readAll);
router.patch('/update/:companyId', ValidateSchema(Schemas.company.update), controller.updateCompany);
router.delete('/delete/:companyId', controller.deleteCompany);

export = router;
