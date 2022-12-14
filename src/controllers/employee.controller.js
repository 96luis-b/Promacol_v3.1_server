
import * as authDB from '../helpers/auth_db'
import * as employeeDB from '../helpers/employee_db'
import * as countEmployeeDB from '../helpers/countEmployee_db'
import { dateTime, orderDate } from '../models/DateTime'
import { generateCode } from '../models/CodeEmployee'
// const path = require('path')
// const multer = require("multer")
// import fs from "fs-extra";
import xlsxFile from "read-excel-file/node";
import XLSX from "xlsx"
import fs from 'fs'

export const signupEmployee = async (req, res) => {
    try {
        const { name1, name2, lastname1, lastname2, birthday, id_number, phone, job } = req.body
        let hide_date = dateTime('date')
        let resCategoryByIdJob = await employeeDB.getCategoryByIdJob(parseInt(job.value))
        let resCountEmployeeByJob = await employeeDB.getCountEmployeeByCategoy(parseInt(resCategoryByIdJob[0].category_id))
        let emp_code = generateCode(resCategoryByIdJob[0].category_name, resCountEmployeeByJob[0].count)
        let resSignup = await employeeDB.signupEmployee(null, 1, emp_code, name1, name2, lastname1, lastname2,
            id_number, null, phone, birthday, null, hide_date, null, true)
        await employeeDB.registerJobByEmployee(parseInt(job.value), resSignup.insertId, dateTime('date'), dateTime('time'), null, null, true)
        res.status(200).json({ status: 200, message: "Registro exitoso", body: emp_code})
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const signupEmployees = async (req, res) => {
    try {

        const data = await xlsxFile(req.file.path);
        let hide_date = dateTime('date')
        let employees = [];
        let resCountEmployeeByJob = await employeeDB.getCountEmployeeByCategoy(parseInt(2))
        let newCode = resCountEmployeeByJob[0].count - 1
        console.log("newCode: ", newCode)
        data.forEach(async (element, index, obj) => {
            if (index == 0) return
            let employee = {
                name1: element[0],
                name2: element[1],
                lastname1: element[2],
                lastname2: element[3],
                birthday: element[4],
                id_number: element[5],
                phone: element[6],
                job: element[7]

            }
            let resEmployeeDuplic = await employeeDB.checkEmployeeByIc(employee.id_number)
            if (resEmployeeDuplic.length == 0) {
                newCode = newCode + 1
                let emp_code = generateCode("Obrero", newCode)
                let resSignup = await employeeDB.signupEmployee(null, 1, emp_code, employee.name1, employee.name2, employee.lastname1, employee.lastname2,
                    employee.id_number, null, employee.phone, employee.birthday, null, hide_date, null, true)
                await employeeDB.registerJobByEmployee(parseInt(employee.job), resSignup.insertId, dateTime('date'), dateTime('time'), null, null, true)
            }
            if (index + 1 == obj.length) {
                // borrar archivo excel de emlpeados
                res.status(200).json({ status: 200, message: "Registro de empleados exitoso" })
            }
        });
        // res.status(200).json({ status: 200, message: "Registro exitoso" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { emp_code, name1, name2, lastname1, lastname2, birthday, id_number, phone, job } = req.body
        let resJobEmployeeCode = await employeeDB.getJobByEmployeeCode(emp_code)
        if (resJobEmployeeCode[0].job_id != job.value) {
            await employeeDB.updateEmployeeJob(job.value, resJobEmployeeCode[0].employee_id)
        }
        await employeeDB.updateEmployee(name1, name2, lastname1, lastname2, id_number,
            phone, birthday, emp_code)
        res.status(200).json({ status: 200, message: "Registro exitoso" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const getJob = async (req, res) => {
    try {
        let jobs = []
        const resJob = await employeeDB.getJob()
        if (resJob.length > 0) {
            resJob.forEach(element => jobs.push({ value: `${element.job_id}`, label: element.job_name }));
        }
        res.status(200).json({ status: 200, message: "Ok", body: jobs })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const searchEmployee = async (req, res) => {
    try {
        const { parameter } = req.params
        console.log("parameter: ", parameter)
        let employee;
        if (parameter.length > 5) {
            employee = await employeeDB.getEmployeeByIdentity(parameter)
        } else {
            employee = await employeeDB.getEmployeeByCode(`OB-${parameter}`, null)
        }
        if (employee.length == 0) {
            console.log("dentro de control")
            return res.status(403).json({ status: 403, message: "Registro no encontrado" })
        }
        if (employee.length == 0) return res.status(403).json({ status: 403, message: "Registro no encontrado" })
        let newDate = orderDate(employee[0].birthday)
        let body = {
            emp_code: employee[0].emp_code,
            name1: employee[0].name1,
            name2: employee[0].name2,
            lastname1: employee[0].lastname1,
            lastname2: employee[0].lastname2,
            birthday: newDate,
            id_number: employee[0].id_number,
            phone: employee[0].phone,
            job: { value: employee[0].job_id, label: employee[0].job_name }
        }

        res.status(200).json({ status: 200, message: "Ok", body: body })
        // res.status(200).json({ status: 200, message: "Ok" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const checkIn = async (req, res) => {
    try {
        const { emp_code } = req.params
        let date = dateTime("date"), time = dateTime("time")
        const resAssitance = await employeeDB.getAssistanceEmployee(emp_code, date)

        if (resAssitance.length == 0) {
            let resIdEmployee = await employeeDB.getIdEmployeeByCode(emp_code)
            await employeeDB.ckeckInEmployee(resIdEmployee[0].employee_id, date, time)
            return res.status(200).json({
                status: 200,
                message: "Chequeo de entrada exitoso",
                body: { employee_id: resIdEmployee[0].employee_id, date: date, time: time }
            })
        }

        if (resAssitance[0].status == true) {
            let resIdEmployee = await employeeDB.getIdEmployeeByCode(emp_code)
            await employeeDB.checkOutEmployee(resIdEmployee[0].employee_id, date, time)
            return res.status(403).json({ status: 403, message: "Usted ya ha chequeado su entrada", body: null })
        }

        // falta la verificacion de salida antes de la hora estipulada de salida de personal 
        // 5:00pm

        res.status(200).json({ status: 200, message: "Ok", body: {} })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const ckeckOut = async (req, res) => {
    try {
        const { employee_id } = req.params
        // let date = dateTime("date")

        // await removeAssistance(employee_id, date)

        res.status(200).json({ status: 200, message: "Ok", body: {} })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const getEmpProduction = async (req, res) => {
    try {
        const { date } = req.body
        let resJob = await employeeDB.getPieceWorkJob()
        let data = [], employee = [], production = [], category = []
        let resEmpCategory = await employeeDB.getEmployeeByCategory(2, date)
        if (resEmpCategory.length > 0) {
            resEmpCategory.forEach(async (element, i) => {
                employee.push(element)
                let resEmpProd = await countEmployeeDB.getEmpProduction(element.employee_id, date)
                console.log("resEmpProd: ", resEmpProd)
                if (resEmpProd.length > 0) {
                    employee[i].production = resEmpProd
                }
                if (resEmpCategory.length == i + 1) {
                    resJob.forEach((job, i) => {
                        let emp = []
                        employee.forEach((d, i) => {
                            if (job.job_id == d.job_id) {
                                emp.push(d)
                            }
                        })
                        if (emp.length > 0) {
                            data.push({ job_name: job.job_name, category: emp })
                        }
                    })
                    return res.status(200).json({ status: 200, message: "Ok", body: data })
                }
            })
        } else {
            res.status(401).json({ status: 401, message: "Registro no existente", })
        }
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const parseJsnToExcel = async (req, res) => {
    try {
        const workSheet = XLSX.utils.json_to_sheet(students)
        const workBook = XLSX.utils.book_new(students)

        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
        XLSX.writeFile(workBook, "./src/public/upload/students.xlsx")

        res.status(200).json({ status: 200, message: "Ok", body: {} })
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const getEmployeeAssist = async (req, res) => {
    try {

        const { date_in } = req.params
        let groupEmployee = [], data = []
        let employee = null
        let resPieceWorkJob = await employeeDB.getPieceWorkJob()
        let resEmployeeAssist = await employeeDB.getEmployeeAssist(date_in, 2)
        if (resEmployeeAssist.length == 0) return res.status(401).json({ status: 401, message: "Registro no encontrado" })
        resPieceWorkJob.forEach((job, i) => {
            groupEmployee = resEmployeeAssist.filter(j => j.job_id == job.job_id);
            data.push({ groupEmployee: groupEmployee, job_name: job.job_name })
        })

        res.status(200).json({ status: 200, message: "Ok", body: data })
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const getProductionByJobGroup = async (req, res) => {
    try {
        console.log("getProductionByJobGroup")

        console.log("body: ", req.body)
        const { date } = req.body
        let resProduct = await employeeDB.getProductionByJobGroup(date)
        if (resProduct.length == 0) return res.status(401).json({ status: 401, message: "Registro no encontrado" })
        console.log("resProduct: ", resProduct)
        res.status(200).json({ status: 200, message: "Ok", body: resProduct })

    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}