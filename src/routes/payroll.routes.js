import { Router } from "express";
import * as payrollCtrl from '../controllers/payroll.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/getPayrollEmployee', payrollCtrl.getPayrollEmployee)
router.post('/payEmployee', [authJwt.verifyToken], payrollCtrl.payEmployee)
router.post('/getPayrollEmployeeReport', payrollCtrl.getPayrollEmployeeReport)
router.post('/downloadExcelPayroll', payrollCtrl.downloadExcelPayroll)
router.post('/latePay', payrollCtrl.allLatePay)

export default router


