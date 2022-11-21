import db from '../database'
import priceSQL from '../database/QUERY/price.query'

export const getExchangeRate = () => {
    let sql = priceSQL.getExchangeRate
    let params = []
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



export const updateExchangeRate = (exchange_value, exchange_id) => {
    let sql = priceSQL.updateExchangeRate
    let params = [exchange_value, exchange_id ]
    console.log("params: ", params)
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

export const exchangeRateHistory = (exchange_id, user_id, exchange_value, date, time) => {
    let sql = priceSQL.exchangeRateHistory
    let params = [exchange_id, user_id, exchange_value, date, time]
    console.log("params: ", params)
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