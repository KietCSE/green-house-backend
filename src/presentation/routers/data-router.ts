import { Router, Request, Response, NextFunction } from "express";
import { createDataController } from "../../factory/data-factory"
import { validateRequest } from "../middleware/data-validation";
import { LoadDataValidation } from "../middleware/data-validation";
const router: Router = Router();

const dataController = createDataController();

// visualize base on monitorsubject 
router.get('/visualize',
    LoadDataValidation, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { dataController.getDataBySubject(req, res, next) })



export default router