import { Router, Request, Response, NextFunction } from "express";
import { createConfigController } from "../../factory/config-factory"

const router: Router = Router();

const configController = createConfigController();

router.get('/:subject', (req: Request, res: Response, next: NextFunction) => { configController.findConfigBySubject(req, res, next); console.log("Received request for subject:", req.params.subject); })
router.post('/', (req: Request, res: Response, next: NextFunction) => { configController.createConfig(req, res, next) })
router.patch('/:subject', (req: Request, res: Response, next: NextFunction) => { configController.updateConfig(req, res, next) })
router.delete('/:subject', (req: Request, res: Response, next: NextFunction) => { configController.deleteConfig(req, res, next) })
router.patch('/turn/:subject', (req: Request, res: Response, next: NextFunction) => { configController.turnConfig(req, res, next) })

router.post('/scheduler', (req: Request, res: Response, next: NextFunction) => { configController.createSchedulerConfig(req, res, next) })
router.patch('/scheduler/:subject', (req: Request, res: Response, next: NextFunction) => { configController.updateSchedulerConfig(req, res, next);});

router.post('/automation', (req: Request, res: Response, next: NextFunction) => { configController.createAutomationConfig(req, res, next) })
router.post('/automation/condition', (req: Request, res: Response, next: NextFunction) => { configController.createCondition(req, res, next) })
router.patch('/automation/condition/:subject', (req: Request, res: Response, next: NextFunction) => { configController.updateCondition(req, res, next)});
router.delete('/automation/condition/:subject', (req: Request, res: Response, next: NextFunction) => { configController.deleteCondition(req, res, next);});

export default router