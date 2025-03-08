//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'
import dataRouter from './data-router'
import monitorRouter from './monitor-router'

const router: Router = Router()

router.use('/user', authenticationRouter)
router.use('/data', dataRouter)
router.use('/monitor', monitorRouter)



export default router

