//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'
import dataRouter from './data-router'
import monitorRouter from './monitor-router'
import notificationRouter from './notification-router'

const router: Router = Router()

router.use('/user', authenticationRouter)
router.use('/data', dataRouter)
router.use('/monitor', monitorRouter)
router.use('/notification', notificationRouter)


export default router

