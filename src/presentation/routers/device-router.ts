import { Router, Request, Response, NextFunction } from "express";
import { createDeviceController } from "../../factory/device-factory"

const router: Router = Router();

const deviceController = createDeviceController();

router.get('/:subject', (req: Request, res: Response, next: NextFunction) => { deviceController.getDeviceBySubject(req, res, next); console.log("Received request for subject:", req.params.subject); })
router.post('/', (req: Request, res: Response, next: NextFunction) => { deviceController.createDevice(req, res, next) })

router.get('/:subject', (req: Request, res: Response, next: NextFunction) => { deviceController.getDeviceBySubject(req, res, next); console.log("Received request for subject:", req.params.subject); })
router.post('/', (req: Request, res: Response, next: NextFunction) => { deviceController.createDevice(req, res, next) })
router.get('/:subject', (req: Request, res: Response, next: NextFunction) => { deviceController.getDeviceBySubject(req, res, next); console.log("Received request for subject:", req.params.subject); })
router.post('/', (req: Request, res: Response, next: NextFunction) => { deviceController.createDevice(req, res, next) })

export default router