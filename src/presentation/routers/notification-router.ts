import { Router, Request, Response, NextFunction } from "express";
import { createNotificationController } from "../../factory/notification-factory"
import { LoadNotification, UpdateNotification, validateRequest } from "../middleware/notification-validation";

const router: Router = Router();

const notificationController = createNotificationController();

// visualize base on monitorsubject 
router.get('/all',
    LoadNotification, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { notificationController.getAllNotification(req, res, next) })


router.patch('/status/:id',
    UpdateNotification, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { notificationController.updateStatusNotification(req, res, next) })


router.get('/poll', (req: Request, res: Response, next: NextFunction) => {
    notificationController.pollingNotification(req, res, next)
})

router.get('/device/auto/poll', (req: Request, res: Response, next: NextFunction) => {
    notificationController.pollingNotificationDevice(req, res, next)
})

router.get('/device/schedule/poll', (req: Request, res: Response, next: NextFunction) => {
    notificationController.pollingNotificationSchedule(req, res, next)
})

export default router



