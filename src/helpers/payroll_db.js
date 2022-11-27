import db from '../database'
import SQL from '../database/QUERY/payroll.query'

export const getPriceByProduct = (currency_id) => {
    let sql = SQL.getPayrollEmployee
    let params = [currency_id]
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

export const getProductPrice = (currency_id) => {
    let sql = SQL.getProductPrice
    let params = [currency_id]
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

export const getExchangeRate = (exchange_id) => {
    let sql = SQL.getExchangeRate
    let params = [exchange_id]
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

export const registerPayEmployee = (employee_id, user_id, total_bs, totalDollar, payBs, payDollar, date, time) => {
    let sql = SQL.registerPayEmployee
    let params = [employee_id, user_id, total_bs, totalDollar, payBs, payDollar, date, time]
    // console.log("params: ", params)
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

export const registerDetailPayEmployee = (payroll_id, prod_id, worker_prod_id, employee_id, quantity, total_bs) => {
    let sql = SQL.registerDetailPayEmployee
    let params = [payroll_id, prod_id, worker_prod_id, employee_id, quantity, total_bs]
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

export const getPayrollExecuted = (date) => {
    let sql = SQL.getPayrollExecuted
    let params = [date]
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


export const allLatePay = () => {
    let sql = SQL.allLatePay
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}
