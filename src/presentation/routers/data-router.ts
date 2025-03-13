import { Router, Request, Response, NextFunction } from "express";
import { createDataController } from "../../factory/data-factory"
import { createHistoryController } from "../../factory/history-factory"
import { validateRequest } from "../middleware/data-validation";
import { LoadDataValidation } from "../middleware/data-validation";
import { LoadHistoryDeviceValidation } from "../middleware/history-validation";
const router: Router = Router();

const dataController = createDataController();
const HistoryDeviceController = createHistoryController();


// visualize base on monitorsubject 
router.get('/visualize',
    LoadDataValidation, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { dataController.getDataBySubject(req, res, next) })

router.get('/device/history',
    LoadHistoryDeviceValidation, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { HistoryDeviceController.getAllHistoryDevice(req, res, next) })


export default router