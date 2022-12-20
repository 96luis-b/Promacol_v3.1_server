import db from '../database'
import priceSQL from '../database/QUERY/price.query'

export const getExchangeRate = () => {
    let sql = priceSQL.getExchangeRate
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
    let params = [exchange_value, exchange_id]
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


export const getPrice = (price_id) => {
    let sql = priceSQL.getPrice
    let params = [price_id]
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

export const updatePrice = (price, price_id) => {
    let sql = priceSQL.updatePrice
    let params = [price, price_id]
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

export const priceHistory = (user_id, price_id, actual_price, previous_price, date, time) => {
    let sql = priceSQL.priceHistory
    let params = [user_id, price_id, actual_price, previous_price, date, time]
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
