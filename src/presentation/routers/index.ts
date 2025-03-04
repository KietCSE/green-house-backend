//MAIN ROUTER

import { Router } from 'express'
import authenticationRouter from './auth-router'

const router: Router = Router()

router.use('/user', authenticationRouter)

export default router

