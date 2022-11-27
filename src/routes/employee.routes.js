import { Router } from "express";
import * as employeeCtrl from '../controllers/employee.controller'
// import * as verifySignup from "../middlewares/verifySignup";
import * as authJwt from '../middlewares/authJwt'
import * as verifySignupEmployee from '../middlewares/verifySignupEmployee'

const path = require('path')
const multer = require("multer")
import fs from "fs-extra";
import xlsxFile from "read-excel-file/node";

const router = Router()

let storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './src/public/upload/')
    },

    filename: function (request, file, callback) {
        console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/signupEmployee', [verifySignupEmployee.checkDuplicateIcEmployee], employeeCtrl.signupEmployee)
router.post('/signupEmployees', upload.single('profile_picture'), employeeCtrl.signupEmployees)
router.post('/updateEmployee', employeeCtrl.updateEmployee)
router.post('/getEmpProduction', employeeCtrl.getEmpProduction)
router.post('/parseJsnToExcel', employeeCtrl.parseJsnToExcel)
router.post('/getProductionByJobGroup', employeeCtrl.getProductionByJobGroup)


router.get('/getEmployeeAssist/:date_in', employeeCtrl.getEmployeeAssist)
router.get('/getJob', authJwt.verifyToken, employeeCtrl.getJob)
router.get('/getEmployee/:parameter', employeeCtrl.searchEmployee)
router.get('/checkIn/:emp_code', employeeCtrl.checkIn)
router.get('/ckeckOut/:emp_code', employeeCtrl.ckeckOut)



export default router


