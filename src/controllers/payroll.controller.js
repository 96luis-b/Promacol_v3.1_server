import * as authDB from '../helpers/auth_db'
import * as payrollDB from '../helpers/payroll_db'
import { dateTime, orderDate } from '../models/DateTime'
import { generateCode } from '../models/CodeEmployee'

import * as countEmployeeDB from '../helpers/countEmployee_db'
import * as employeeDB from '../helpers/employee_db'
import XLSX from "xlsx"

export const getPayrollEmployee = async (req, res) => {
  try {
    const { emp_code, start_date, end_date } = req.body
    // console.log("body: ", req.body)
    let total = 0;
    let data = {}, production = []
    let detail;
    // let resPrice = await payrollDB.getPriceByProduct(1)
    let resProductPrice = await payrollDB.getProductPrice(1)

    let resExchangeRate = await payrollDB.getExchangeRate(1)

    let resEmployee = await countEmployeeDB.searchEmployee(`OB-${emp_code}`)

    // let resProdJob = await countEmployeeDB.getProductJob(`OB-${emp_code}`)
    // console.log("resProdJob: ", resProdJob)

    let resProduction = await countEmployeeDB.getEmpProductionByStatus(`OB-${emp_code}`, start_date, end_date, true)
    console.log("resProduction: ", resProduction)
    if (resProduction.length == 0) return res.status(403).json({ status: 403, message: "Registro no existente" })
    resProduction.forEach(async (element, i) => {
      production.push(element)
      production[i].start_date = orderDate(element.start_date)
      detail = await countEmployeeDB.getEmpProducDetailByProduct(element.worker_prod_id)
      detail = sortAsc(detail)
      totalBsByProduction(production[i], detail, resProductPrice)
      if ((i + 1) == resProduction.length) {
        let reckon = payReckon(production, resExchangeRate[0])
        data = { totalValues: reckon, production, employee: resEmployee[0] }
        return res.status(200).json({ status: 200, message: "Ok", body: data })
        // return res.status(200).json({ status: 200, message: "Ok" })
      }
    });


    // res.status(200).json({ status: 200, message: "Ok" })
    // res.status(403).json({ status: 403, message: "Ok"})
  } catch (error) {
    console.log(`${error}`)
    res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
  }
}

export const payEmployee = async (req, res) => {
  try {
    const { employee_id, production, totalValues } = req.body
    let resPrice = await payrollDB.getPriceByProduct(1)
    let date = dateTime("date"), time = dateTime("time")    // req.user_id
    let resReg = await payrollDB.registerPayEmployee(employee_id, 1, date, time, totalValues.totalBs)
    production.forEach((p) => {
      p.detail.forEach(async (d) => {
        await payrollDB.registerDetailPayEmployee(
          resReg.insertId,
          d.prod_id,
          p.worker_prod_id,
          employee_id,
          d.quantity,
          d.subTotalBs
        )
        await countEmployeeDB.updateEmpProductin(p.worker_prod_id)
      });
    })

    res.status(200).json({ status: 200, message: "Registrado exitoso" })
    // res.status(403).json({ status: 403, message: "Ok"})
  } catch (error) {
    console.log(`${error}`)
    res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
  }
}

export const getPayrollEmployeeReport = async (req, res) => {
  try {
    const { date } = req.body
    let status = 0;
    let payroll = [], payroll_detail = [], employee_id = []
    let data = {}, pack;
    let resPayExecute = await payrollDB.getPayrollExecuted(date)
    if (resPayExecute == false) return res.status(403).json({ status: 403, message: "Registro no encontrado" })
    resPayExecute.forEach((element, i, arr) => {
      let indexUpdate = [];
      payroll_detail = []
      pack = arr.filter((word, j) => {
        if (word.worker_prod_id == element.worker_prod_id && element.worker_prod_id) {
          indexUpdate.push(j)
          payroll_detail.push({
            prod_id: word.prod_id,
            prod_name: word.prod_name,
            total_bs: word.total_bs,
            payroll_detail_id: word.payroll_detail_id,
            quantity: word.quantity,
          })
        }
      })
      if (payroll_detail.length > 0) {
        payroll.push({
          employee_id: element.employee_id,
          payroll_id: element.payroll_id,
          date: element.start_date,
          user_id: element.user_id,
          worker_prod_id: element.worker_prod_id,
          total_bs: element.total_pay_bs,
          payroll_detail: payroll_detail
        })
      }

      indexUpdate.forEach((value, q) => {
        arr[value] = {}
      })

    })

    payroll.forEach((element) => {
      employee_id.push(element.employee_id)
    });

    employee_id = filterDuplicate(employee_id)
    let newPayroll = [], newPayrollDetail = []
    employee_id.forEach((e, j, elem) => {
      payroll.forEach((p, index, element) => {
        if (e == p.employee_id) {
          newPayrollDetail.push(p)
        }
        if (index + 1 == element.length) {
          newPayroll.push({ employee_id: e, payroll: newPayrollDetail })
          newPayrollDetail = []
        }
      })
      if (j + 1 == elem.length) {
        data = newPayroll
      }
    })

    data.forEach(async (d, i, elem) => {
      let resEmpByCode = await employeeDB.getEmployeeByCode(null, d.employee_id)
      d.emp_code = resEmpByCode[0].emp_code
      d.name1 = resEmpByCode[0].name1
      d.name2 = resEmpByCode[0].name2
      d.lastname1 = resEmpByCode[0].lastname1
      d.lastname2 = resEmpByCode[0].lastname2
      d.id_number = resEmpByCode[0].id_number
      d.job_name = resEmpByCode[0].job_name
      d.job_id = resEmpByCode[0].job_id
      if (i + 1 == elem.length) {
        res.status(200).json({ status: 200, message: "Ok", body: elem })
      }
    })

    // res.status(200).json({ status: 200, message: "Ok", body: {} })
  } catch (error) {
    console.log(`${error}`)
    res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
  }
}

export const downloadExcelPayroll = async (req, res) => {
  try {
    const { data } = req.body
    console.log("data: ", data)
    let json = {}
    let dataBox = []
    data.forEach((d, i) => {
      d.payroll.forEach((elem, j) => {
        elem.payroll_detail.forEach((e, z) => {
          json.fecha = elem.date
          json.grupo = d.job_name
          json.codigo = d.emp_code
          json.cedula = d.id_number
          json.nombre = `${d.name1} ${d.name2} ${d.lastname1} ${d.lastname2}`
          json.producto = `${e.prod_name}: ${e.quantity}`
          json.total_parcial_bs = e.total_bs
          json.total_bs = elem.total_bs

          dataBox.push(json)
          json = {}

        })
      })
      if (i + 1 == data.length) {
        const workSheet = XLSX.utils.json_to_sheet(dataBox)
        const workBook = XLSX.utils.book_new(dataBox)

        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
        XLSX.writeFile(workBook, "./src/public/upload/payrollEmployee.xlsx")
        res.status(200).json({ status: 200, message: "Ok", body: dataBox })
      }
    })

  } catch (error) {
    console.log(`${error}`)
    res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
  }
}

export const allLatePay = async (req, res) => {
  try {
    let groupEmployee = [], data = [], employees = []
    let employee = null

    let resAllLatePay = await payrollDB.allLatePay()
    let resExchageRate = await payrollDB.getExchangeRate(1)
    if (resAllLatePay.length == 0) return res.status(401).json({ status: 401, message: "Registro no encontrado", body: {} })
    resAllLatePay.forEach(async (elem, i, d) => {
      let products = []
      let resEmpProdDetail = await countEmployeeDB.getEmployeeProductionDetail(elem.worker_prod_id, elem.start_date)

      resEmpProdDetail.forEach((prod, j, prod_detail) => {
        resExchageRate.forEach((rate) => {
          if (rate.prod_id == prod.prod_id) {
            prod.price = rate.price
            products.push(prod)
          }
        })
      })

      employees.push({ ...elem, products: products })
      if (i + 1 == d.length) {
        employees.forEach((emp, z, em) => {
          groupEmployee = em.filter(e => e == emp);
          data.push({ groupEmployee: groupEmployee, job_name: emp.job_name })
        })
        res.status(200).json({ status: 200, message: "Ok", body: data })
      }
    })

    // res.status(200).json({ status: 200, message: "Ok", body:  })

  } catch (error) {
    res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
  }
}

const totalBsByProduction = async (production, detail, prodPrice) => {
  let total = 0
  detail.forEach((elem) => {
    prodPrice.forEach((rate) => {
      if (elem.prod_id == rate.prod_id) {
        elem.subTotalBs = elem.quantity * rate.price
        total = elem.subTotalBs + total
      }
    })
    production.totalBs = total
    production.detail = detail
  })
}

const payReckon = (data, exchange) => {
  let d = {}
  let totalUnid = 0, totalBs = 0, totalDollar = 0, payDollar = 0, diffBs = 0, rate = exchange.exchange_value;
  data.forEach((elem, i) => {
    totalUnid = elem.total + totalUnid
    totalBs = elem.totalBs + totalBs
    totalDollar = (elem.totalBs * rate) + totalDollar
    if (i + 1 == data.length) {
      d.totalUnid = parseFloat(totalUnid).toFixed(2) 
      d.totalBs = parseFloat(totalBs.toFixed(2))
      d.totalDollar = parseFloat(totalDollar.toFixed(2))
      d.payDollar = parseInt(d.totalDollar)
      let q = ((d.totalDollar - (Math.floor(d.totalDollar))) / rate)
      d.payBs = parseFloat(q.toFixed(2))
      d.rate = rate
      return
    }
  })
  return d
}

const sortAsc = (data) => {
  let arr = [], resul = []
  data.forEach((elem, i) => {
    arr[elem.prod_id] = elem
  })
  arr.forEach((elem, i) => {
    if (elem != false) {
      resul.push(elem)
    }
  })
  return resul
}

const filterDuplicate = (arr) => {
  let newArray = [...new Set(arr)]
  return newArray
}

