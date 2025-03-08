//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'
import dataRouter from './data-router'
import deviceRouter from './device-router'

const router: Router = Router()

router.use('/user', authenticationRouter)
router.use('/data', dataRouter)
router.use('/device', deviceRouter)

export default router

