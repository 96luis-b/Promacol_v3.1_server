import db from '../database'
import SQL from '../database/QUERY/auth.query'



export const signin = (user_id) => {
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

export const getUserByUsername = (username) => {
    let sql = SQL.getUserByUsername
    let params = [username]
    return new Promise((resolve, reject) => {
        db.query(sql, params,(err, rows, fields) => {
            try {
                resolve(rows)
            } catch (err) {
                console.log(err)
            }
        })
    })
}


export const getUserById = (user_id) => {
    let sql = SQL.getUserById
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

export const getUserRole = (user_id) => {
    let sql = SQL.getUserRole
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

export const checkDuplicateSession = (username) => {
    let sql = SQL.checkDuplicateSession
    let params = [username]
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

export const newSession = (user_id, start_date, start_time) => {
    let sql = SQL.newSession
    let params = [user_id, start_date, start_time]
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

export const logout = (user_id, end_date, end_time) => {
    let sql = SQL.logout
    let params = [end_date, end_time, parseInt(user_id)]
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

export const checkUser = (user_id, role) => {
    let sql = SQL.checkUser
    let params = [user_id, role]
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
