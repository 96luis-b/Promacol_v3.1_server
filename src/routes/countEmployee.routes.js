import { Router } from "express";
import * as countEmployeeCtrl from '../controllers/countEmployee.controller'
// import * as verifySignup from "../middlewares/verifySignup";
import * as authJwt from '../middlewares/authJwt'
// import * as verifySignupEmployee from '../middlewares/verifySignupEmployee'

const router = Router()


router.get('/searchCountEmployee/:parameter', countEmployeeCtrl.searchCountEmployee)
router.post('/moreLess', authJwt.verifyToken,  countEmployeeCtrl.moreLess)
// router.get('/searchCountEmployee', countEmployeeCtrl.searchCountEmployee)


// router.post('/signupEmployee', [verifySignupEmployee.checkDuplicateIcEmployee], employeeCtrl.signupEmployee)
// router.post('/updateEmployee', employeeCtrl.updateEmployee)

// router.get('/getJob', authJwt.verifyToken, employeeCtrl.getJob)
// router.get('/getEmployee/:parameter', employeeCtrl.searchEmployee)

export default router


