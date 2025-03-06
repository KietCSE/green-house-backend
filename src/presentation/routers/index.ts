//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'
import dataRouter from './data-router'

const router: Router = Router()

router.use('/user', authenticationRouter)
router.use('/data', dataRouter)

export default router

