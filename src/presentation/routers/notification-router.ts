import { Router, Request, Response, NextFunction } from "express";
import { createNotificationController } from "../../factory/notification-factory"

const router: Router = Router();

const notificationController = createNotificationController();

// visualize base on monitorsubject 
router.get('/all', (req: Request, res: Response, next: NextFunction) => { notificationController.getAllNotification(req, res, next) })


export default router



