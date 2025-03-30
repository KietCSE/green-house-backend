import { Router, Request, Response, NextFunction } from "express";
import { createMonitorController } from "../../factory/monitor-factory";
import { addMonitorSubject, updateMonitorSubject, validateRequest } from "../middleware/monitor-validation";
import { setAlertValdation } from "../middleware/alert-validation";

const router: Router = Router();

const monitorController = createMonitorController();

// visualize base on monitorsubject 
router.get('/all',
    (req: Request, res: Response, next: NextFunction) => { monitorController.getAllSubject(req, res, next) })

router.get('/feed/all',
    (req: Request, res: Response, next: NextFunction) => { monitorController.getAllSubjectName(req, res, next) })

// router.patch('/alert/status',
//     (req: Request, res: Response, next: NextFunction) => { monitorController.updateWarningStatus(req, res, next) })

router.post('/alert/:id',
    setAlertValdation, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { monitorController.setAlertInformation(req, res, next) })


router.delete('/:id',
    (req: Request, res: Response, next: NextFunction) => { monitorController.deleteMonitorSubject(req, res, next) })


router.patch('/:id',
    updateMonitorSubject, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { monitorController.updateMonitorSubject(req, res, next) })


router.post('/',
    addMonitorSubject, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { monitorController.addMonitorSubject(req, res, next) })


export default router



