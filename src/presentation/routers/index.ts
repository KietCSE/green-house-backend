//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'
import dataRouter from './data-router'
import deviceRouter from './device-router'
import configRouter from './config-router'

const router: Router = Router()

router.use('/user', authenticationRouter)
router.use('/data', dataRouter)
router.use('/device', deviceRouter)
router.use('/device/config', configRouter)

export default router

