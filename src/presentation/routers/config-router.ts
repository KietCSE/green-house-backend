import { Router, Request, Response, NextFunction } from "express";
import { createConfigController } from "../../factory/config-factory"

const router: Router = Router();

const configController = createConfigController();

router.get('/:subject', (req: Request, res: Response, next: NextFunction) => { configController.findConfigBySubject(req, res, next); console.log("Received request for subject:", req.params.subject); })
router.post('/', (req: Request, res: Response, next: NextFunction) => { configController.createConfig(req, res, next) })
router.post('/scheduler', (req: Request, res: Response, next: NextFunction) => { configController.createSchedulerConfig(req, res, next) })
router.post('/automation', (req: Request, res: Response, next: NextFunction) => { configController.createAutomationConfig(req, res, next) })
router.post('/automation/condition', (req: Request, res: Response, next: NextFunction) => { configController.createCondition(req, res, next) })

export default router