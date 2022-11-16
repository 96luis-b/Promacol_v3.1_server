import db from '../database'
import SQLCurrency from '../database/QUERY/currency.query'



export const getCurrencies = () => {
    let sql = SQLCurrency.getCurrencies
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

export const getExchangeRate = () => {
    let sql = SQLCurrency.getExchangeRate
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



export const updateExchangeRate = () => {
    let sql = SQLCurrency.updateExchangeRate
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


export const getProductPrice = ()=>{
    let sql = SQLCurrency.getProductPrice
    return new Promise((resolve, reject)=>{
        db.query(sql, (err, rows, fields)=>{
            try{
                resolve(rows)
            }catch(err){
                console.log(err)
            }
        })
    })
}



export const updateProdPrice = (price, currency_id, price_id)=>{
    let sql = SQLCurrency.updateProdPrice
    let params = [price, currency_id, price_id]
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


export const getCurrencyByName = (currency_name)=>{
    let sql = SQLCurrency.getCurrencyByName
    let params = [currency_name]
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


export const newPrice = (currency_id, price)=>{
    let sql = SQLCurrency.newPrice
    let params = [currency_id, price]
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

export const newProductPrice = (prod_id, price_id)=>{
    let sql = SQLCurrency.newProductPrice
    let params = [prod_id, price_id]
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

/*
export const getProdByName = (prod_name)=>{
    let sql = SQLCurrency.getProdByName
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

*/