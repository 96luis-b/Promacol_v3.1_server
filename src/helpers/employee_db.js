import db from '../database'
import SQL from '../database/QUERY/auth.query'
import SQL_Employee from '../database/QUERY/employee.query'


export const signupEmployee = (room_id, ident_document_id, emp_code, name1, name2, lastname1, lastname2,
    id_number, email, phone, birthday, address, hide_date, dismiss_date, status) => {
    let sql = SQL_Employee.signupEmployee
    let params = [
        room_id, ident_document_id, emp_code, name1, name2, lastname1, lastname2,
        id_number, email, phone, birthday, address, hide_date, dismiss_date, status
    ]
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

export const registerJobByEmployee = (job_id, employee_id, date_in, time_in, date_out, time_out, status) => {
    let sql = SQL_Employee.registerJobByEmployee
    let params = [job_id, employee_id, date_in, time_in, date_out, time_out, status]
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

export const getLastIdByEmploye = (user_id) => {
    let sql = SQL.signin
    let params = [user_id]
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

export const getJob = () => {
    let sql = SQL_Employee.getJob
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

export const getWorkmanJob = (category_id) => {
    let sql = SQL_Employee.getWorkmanJob
    let params = [category_id]
    return new Promise((resolve, reject) => {
        db.query(sql, params,  (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const getProductWorkman = (category_id) => {
    let sql = SQL_Employee.getProductWorkman
    let params = [category_id]
    return new Promise((resolve, reject) => {
        db.query(sql, params,  (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}


export const getProductWorkmanByJobID = (category_id, job_id) => {
    let sql = SQL_Employee.getProductWorkmanByJobID
    let params = [category_id, job_id]
    return new Promise((resolve, reject) => {
        db.query(sql, params,  (err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}

export const checkEmployeeByIc = (ic) => {
    let sql = SQL_Employee.checkEmployeeByIc
    let params = [ic]
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

export const getLastInsertId = () => {
    let sql = SQL_Employee.checkEmployeeByIc
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

export const getCountEmployeeByCategoy = (category_id) => {
    let sql = SQL_Employee.getCountEmployeeByCategoy
    let params = [category_id]
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

export const getCategoryByIdJob = (job) => {
    let sql = SQL_Employee.getCategoryByIdJob
    let params = [job]
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


export const getJobName = () => {
    let sql = SQL_Employee.getJobName
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

export const getJobByEmployeeCode = (emp_code) => {
    let sql = SQL_Employee.getJobByEmployeeCode
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

export const updateEmployee = (name1, name2, lastname1, lastname2, id_number, phone, birthday, emp_code) => {
    let sql = SQL_Employee.updateEmployee
    let params = [name1, name2, lastname1, lastname2, id_number, phone, birthday, emp_code]
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

export const updateEmployeeJob = (job_id, employee_id) => {
    let sql = SQL_Employee.updateEmployeeJob
    let params = [job_id, employee_id]
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

export const getEmployeeByCode = (parameter, employee_id) => {
    let sql = SQL_Employee.getEmployeeByCode
    let params = [parameter, employee_id]
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

export const getEmployeeByIdentity = (parameter) => {
    let sql = SQL_Employee.getEmployeeByIdentity
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

export const getAssistanceEmployee = (emp_code, date_in) => {
    let sql = SQL_Employee.getAssistanceEmployee
    let params = [emp_code, date_in]
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

export const ckeckInEmployee = (employee_id, date_in, time_in) => {
    let sql = SQL_Employee.ckeckInEmployee
    let params = [employee_id, date_in, time_in]
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

export const getIdEmployeeByCode = (emp_code) => {
    let sql = SQL_Employee.getIdEmployeeByCode
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

export const checkOutEmployee = (employee_id, date_in, time_in) => {
    let sql = SQL_Employee.checkOutEmployee
    let params = [employee_id, date_in, time_in]
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

export const removeAssistance = (employee_id, date) => {
    let sql = SQL_Employee.removeAssistance
    let params = [employee_id, date]
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

export const getPieceWorkJob = () => {
    let sql = SQL_Employee.getPieceWorkJob
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

export const getEmployeeByCategory = (category_id, start_date) => {
    let sql = SQL_Employee.getEmployeeByCategory
    let params = [category_id, start_date]
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

export const getEmployeeAssist = (date_in, category_id) => {
    let sql = SQL_Employee.getEmployeeAssist
    let params = [date_in, category_id]
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


export const getProductionByJobGroup = (date) => {
    let sql = SQL_Employee.getProductionByJobGroup
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

export const addJobProductWorkman = (job_id, prod_id) => {
    let sql = SQL_Employee.addJobProductWorkman
    let params = [job_id, prod_id]
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

export const removeJobProductWorkman = (job_id, prod_id) => {
    let sql = SQL_Employee.removeJobProductWorkman
    let params = [job_id, prod_id]
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

export const getProduct = () => {
    let sql = SQL_Employee.getProduct
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
