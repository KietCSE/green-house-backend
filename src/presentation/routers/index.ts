//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'
import dataRouter from './data-router'
import monitorRouter from './monitor-router'
import notificationRouter from './notification-router'
import deviceRouter from './device-router'
import configRouter from './config-router'
import mqttRouter from './mqtt-router'

const router: Router = Router()

router.use('/user', authenticationRouter)
router.use('/data', dataRouter)
router.use('/monitor', monitorRouter)
router.use('/notification', notificationRouter)
router.use('/device', deviceRouter)
router.use('/device/config', configRouter)
router.use('/mqtt', mqttRouter)

export default router

