import { Router } from "express";
import * as payrollCtrl from '../controllers/payroll.controller'
// import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/getPayrollEmployee', payrollCtrl.getPayrollEmployee)
router.post('/payEmployee', payrollCtrl.payEmployee)
router.post('/getPayrollEmployeeReport', payrollCtrl.getPayrollEmployeeReport)
router.post('/downloadExcelPayroll', payrollCtrl.downloadExcelPayroll)

router.post('/latePay', payrollCtrl.allLatePay)



// router.post('/moreLess', authJwt.verifyToken,  countEmployeeCtrl.moreLess)
// router.get('/searchCountEmployee', countEmployeeCtrl.searchCountEmployee)


// router.post('/signupEmployee', [verifySignupEmployee.checkDuplicateIcEmployee], employeeCtrl.signupEmployee)
// router.post('/updateEmployee', employeeCtrl.updateEmployee)

// router.get('/getJob', authJwt.verifyToken, employeeCtrl.getJob)
// router.get('/getEmployee/:parameter', employeeCtrl.searchEmployee)

export default router


