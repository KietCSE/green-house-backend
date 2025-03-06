import { Router, Request, Response, NextFunction } from "express";
import { createDataController } from "../../factory/data-factory"

const router: Router = Router();

const dataController = createDataController();

// visualize base on monitorsubject 
router.get('/visualize/:subject', (req: Request, res: Response, next: NextFunction) => { dataController.getDataBySubject(req, res, next) })


export default router