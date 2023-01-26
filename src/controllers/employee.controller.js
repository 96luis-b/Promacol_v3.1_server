
import * as authDB from '../helpers/auth_db'
import * as employeeDB from '../helpers/employee_db'
import * as countEmployeeDB from '../helpers/countEmployee_db'
import { dateTime, orderDate } from '../models/DateTime'
import { generateCode } from '../models/CodeEmployee'
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
        res.status(200).json({ status: 200, message: "Registro exitoso", body: emp_code })
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

export const getWorkmanJob = async (req, res) => {
    try {
        let jobObj = {}
        let categories = []
        let catefory = {}
        let products = []
        let CATEGORI_ID = 2
        const resJob = await employeeDB.getWorkmanJob(CATEGORI_ID)
        // console.log("resJob: ", resJob)
        // let result = resJob.filter((job,index)=>{
        //     // console.log("job: ", job)
        //     // console.log("index: ", index)
        //     return resJob.indexOf(job.job_id) === job.job_id;
        //   })
        const arrReduction = resJob.reduce((acc, item) => {
            if (!acc.includes(item.job_id)) {
                acc.push(item.job_id);
            }
            return acc;
        }, [])

        let result = orderCategoryJobProd(arrReduction, resJob)
        console.log("result: ", result)
        // res.status(200).json({ status: 200, message: "Ok" })
        res.status(200).json({ status: 200, message: "Ok", body: result })
        // res.status(200).json({ status: 200, message: "Ok", body: categories })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const searchEmployee = async (req, res) => {
    try {
        const { parameter } = req.params
        let employee;
        if (parameter.length > 5) {
            employee = await employeeDB.getEmployeeByIdentity(parameter)
        } else {
            employee = await employeeDB.getEmployeeByCode(`OB-${parameter}`, null)
        }
        if (employee.length == 0) {
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
        res.status(200).json({ status: 200, message: "Ok", body: {} })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const ckeckOut = async (req, res) => {
    try {
        const { employee_id } = req.params
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
                let resProdJob = await countEmployeeDB.getProductJobByIdEmp(element.employee_id)
                let resultAddProdJob = addProdJod(resProdJob, resEmpProd)
                if (resultAddProdJob.length > 0) {
                    employee[i].production = resultAddProdJob
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
        const data = [
            { name: 'Diary', code: 'diary_code', author: 'Pagorn' },
            { name: 'Note', code: 'note_code', author: 'Pagorn' },
            { name: 'Medium', code: 'medium_code', author: 'Pagorn' },
        ]
        const workSheet = XLSX.utils.json_to_sheet(data)
        const workBook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workBook, workSheet, "test1")
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
        XLSX.writeFile(workBook, "./src/public/upload/test.xlsx")

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
        const { date } = req.body
        let resProduct = await employeeDB.getProductionByJobGroup(date)
        if (resProduct.length == 0) return res.status(401).json({ status: 401, message: "Registro no encontrado" })
        res.status(200).json({ status: 200, message: "Ok", body: resProduct })

    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }M
}

export const getProductWorkman = async (req, res) => {
    try {
        let { job_id } = req.params
        let CATEGORY_JOB = 2;
        let resProduct = await employeeDB.getProduct()
        let resProductByJobID = await employeeDB.getProductWorkmanByJobID(CATEGORY_JOB, job_id)
        let result = newListProdJob(resProduct, resProductByJobID)
        res.status(200).json({ status: 200, message: "Ok", body: result })
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const addJobProductWorkman = async (req, res) => {
    try {
        let { job_id, prod_id } = req.body
        await employeeDB.addJobProductWorkman(job_id, prod_id)
        res.status(200).json({ status: 200, message: "Se ha agregado exitosamente" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const removeJobProductWorkman = async (req, res) => {
    try {
        let { job_id, prod_id } = req.body
        await employeeDB.removeJobProductWorkman(job_id, prod_id)
        res.status(200).json({ status: 200, message: "Se ha agregado exitosamente" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

const addProdJod = (resProdJob, resEmpProd) => {
    let newArr = [...resProdJob]
    let exist = false
    resProdJob.forEach((prodJob, i) => {
        exist = false
        resEmpProd.forEach((prodProduction, j, listProdProduction) => {
            if (prodJob.prod_id == prodProduction.prod_id) {
                exist = true
                newArr[i].quantity = prodProduction.quantity
                prodProduction.status = true
                return
            }
            newArr.forEach((newProd, z, listNewProd) => {
                if (newProd.prod_id !== prodProduction.prod_id && z + 1 == listNewProd.length && exist != true && prodProduction.status != true) {
                    newArr.push(prodProduction)
                    return
                }
            });
        });

    })
    return newArr
}

const orderCategoryJobProd = (arrReduction, resJob) => {
    let newArr = []
    let jobs = []
    let jobJson = {}
    arrReduction.forEach((job_id, i) => {
        newArr = []
        resJob.forEach((job, j, listJob) => {
            if (job_id == job.job_id) {
                newArr.push({ prod_id: job.prod_id, prod_name: job.prod_name })
                jobJson.job_id = job.job_id
                jobJson.job_name = job.job_name
                return
            }
        });
        jobs.push({
            job_name: jobJson.job_name,
            job_id: jobJson.job_id,
            products: newArr
        })
    })
    return jobs
}

const newListProdJob = (allProdJob, prodJob) => {
    prodJob.forEach(itemProdJob => {
        let newArr = []
        newArr = allProdJob.filter(itemProd => itemProd.value != itemProdJob.value)
        allProdJob = newArr
    })
    return allProdJob
}