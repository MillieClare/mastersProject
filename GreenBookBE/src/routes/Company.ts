import express from 'express';
import controller from '../controllers/Company';

const router = express.Router();

router.post('/create', controller.createCompany);
router.get('/get/:companyId', controller.readCompany);
router.get('/get/', controller.readAll);
router.patch('/update/:companyId', controller.updateCompany);
router.delete('/delete/:companyId', controller.deleteCompany);

export = router;
