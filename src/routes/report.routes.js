import { Router } from "express";
import * as report from '../controllers/report.controller'

const router = Router()


router.post('/createWorkmanProductionReport', report.createWorkmanProductionReport)
router.post('/createPayrollReport', report.createPayrollReport)



// router.post('/payEmployee', [authJwt.verifyToken], payrollCtrl.payEmployee)

export default router


