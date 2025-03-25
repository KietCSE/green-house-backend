import { Router, Request, Response, NextFunction } from "express";
import { createMonitorController } from "../../factory/monitor-factory";
import { addMonitorSubject, validateRequest } from "../middleware/monitor-validation";
import { setAlertValdation } from "../middleware/alert-validation";

const router: Router = Router();

const monitorController = createMonitorController();

// visualize base on monitorsubject 
router.get('/all', (req: Request, res: Response, next: NextFunction) => { monitorController.getAllSubject(req, res, next) })

router.get('/feed/all', (req: Request, res: Response, next: NextFunction) => { monitorController.getAllSubjectName(req, res, next) })

router.patch('/alert/status', (req: Request, res: Response, next: NextFunction) => { monitorController.updateWarningStatus(req, res, next) })

router.post('/alert',
    setAlertValdation, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { monitorController.setAlertInformation(req, res, next) })

router.post('/add',
    addMonitorSubject, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { monitorController.addMonitorSubject(req, res, next) })

router.put('/update',
    addMonitorSubject, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { monitorController.updateMonitorSubject(req, res, next) })

router.delete('/delete/:feed', (req: Request, res: Response, next: NextFunction) => { monitorController.deleteMonitorSubject(req, res, next) })

export default router



