import { Router, Request, Response, NextFunction } from "express";
import { createMonitorController } from "../../factory/monitor-factory";

const router: Router = Router();

const monitorController = createMonitorController();

// visualize base on monitorsubject 
router.get('/all', (req: Request, res: Response, next: NextFunction) => { monitorController.getAllSubject(req, res, next) })

router.get('/name/all', (req: Request, res: Response, next: NextFunction) => { monitorController.getAllSubjectName(req, res, next) })


export default router



