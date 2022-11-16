import db from '../database'
import SQL from '../database/QUERY/countEmployee.query'
import SQL_Employee from '../database/QUERY/employee.query'


export const searchEmployee = (parameter) => {
    let sql = SQL.searchEmployee
    let params = [parameter]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getEmployeeProduction = (emp_code, start_date, end_date, status) => {
    let sql = SQL.getEmployeeProduction
    let params = [emp_code, start_date, end_date, status]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getEmpProductionByStatus = (emp_code, start_date, end_date, status) => {
    let sql = SQL.getEmpProductionByStatus
    let params = [emp_code, start_date, end_date, status]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getEmpProducDetail = (worker_prod_id) => {
    let sql = SQL.getEmpProducDetail
    let params = [worker_prod_id]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getEmpProducDetailByProduct = (worker_prod_id) => {
    let sql = SQL.getEmpProducDetailByProduct
    let params = [worker_prod_id]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getProductJob = (emp_code)=>{
    let sql = SQL.getProductJob
    let params = [emp_code]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const newEmployeeProduction = (employee_id, total, start_date, start_time)=>{
    let sql = SQL.newEmployeeProduction
    let params = [employee_id, total, start_date, start_time]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const newDetailProduction = (worker_prod_id, user_id, prod_id, employee_id, quantity, date, time)=>{
    let sql = SQL.newDetailProduction
    let params = [worker_prod_id, user_id, prod_id, employee_id, quantity, date, time]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const updateTotalProduction = (worker_prod_id, total)=>{
    let sql = SQL.updateTotalProduction
    let params = [total, worker_prod_id ]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getEmpProduction = (date, time) => {
    let sql = SQL.getEmpProduction
    let params = [date, time]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const updateEmpProductin = (worker_prod_id) => {
    let sql = SQL.updateEmpProductin
    let params = [worker_prod_id]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getEmployeeProductionDetail = (worker_prod_id, start_date) => {
    let sql = SQL.getEmployeeProductionDetail
    let params = [worker_prod_id, start_date]
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getProdByName = (prod_name)=>{
    let sql = SQL.getProdByName
    let params = [prod_name]
    return new Promise((resolve, reject)=>{
        db.query(sql, params, (err, rows, fields)=>{
            try{
                resolve(rows)
            }catch(err){
                console.log(err)
            }
        })
    })
}