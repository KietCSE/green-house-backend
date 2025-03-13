import { Router, Request, Response, NextFunction } from "express";
import { createMqttController } from "../../factory/mqtt-factory"

const router: Router = Router();

const mqttController = createMqttController();

router.get('/:feed', (req: Request, res: Response, next: NextFunction) => { mqttController.listenFeed(req, res, next) })
router.post('/', (req: Request, res: Response, next: NextFunction) => { mqttController.sendMessage(req, res, next) })


export default router