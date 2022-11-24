import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcryptjs'
import * as priceDB from '../helpers/price_db'
import { dateTime } from '../models/DateTime'
import * as currencyDB from '../helpers/currency_db'

export const getExchangeRate = async (req, res) => {
    try {
        const resExchRate = await priceDB.getExchangeRate()
        res.status(200).json({ status: 200, message: "Ok", body: resExchRate })
        // res.status(500).json({ status: 500, message: "Ha ocurrido un error inesperado" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const updateExchangeRate = async (req, res) => {
    try {
        console.log("body: ", req.body)
        const CURRENCY_EXCHANGE_UNIT = 1
        const { exchange_id, exchange_value, input_currency, output_currency } = req.body
        const date = dateTime('date'), time = dateTime('time');
        let resExchRate = await priceDB.getExchangeRate()
        resExchRate.forEach(e => {
            if (input_currency != e.input_currency) {
                e.exchange_value = (CURRENCY_EXCHANGE_UNIT / exchange_value).toFixed(2)
            } else {
                e.exchange_value = exchange_value
            }
        });
        resExchRate.forEach(async (e) => {
            await priceDB.updateExchangeRate(e.exchange_value, e.exchange_id)
            await priceDB.exchangeRateHistory(e.exchange_id, req.user_id, e.exchange_value, date, time)
        })
        await updateAllProdPrice(
            CURRENCY_EXCHANGE_UNIT, 
            input_currency, 
            output_currency, 
            exchange_value, 
            req.user_id
        )
       /**
        *  // console.log("datos: ", datos)
        // console.log("resp: ", resp)
        // await priceDB.updateExchangeRate(exchange_value, exchange_id)
        // await priceDB.exchangeRateHistory(exchange_id, req.user_id, exchange_value, date, time)
        */
        resExchRate = await priceDB.getExchangeRate()
        res.status(200).json({ status: 200, message: "Cambios realizados con exito", body: resExchRate})
        // res.status(500).json({ status: 500, message: "Ha ocurrido un error inesperado" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error", body: datos })
    }
}

export const updateProdPrice = async (req, res) => {
    try {
        console.log("req.body: ", req.body)
        const { group } = req.body
        const date = dateTime('date'), time = dateTime('time');
        group.forEach(async (p) => {
            let resPrice = await priceDB.getPrice(p.price_id)
            await priceDB.updatePrice(p.price, p.price_id)
            await priceDB.priceHistory(req.user_id, p.price_id, p.price, resPrice[0].price, date, time)
        });

        res.status(200).json({ status: 200, message: "Cambios realizados con exito" })
        // res.status(500).json({ status: 500, message: "Ha ocurrido un error inesperado" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

const updateAllProdPrice = async (CURRENCY_EXCHANGE_UNIT, input_currency, output_currency, exchange_value, user_id) => {
    try {
        const date = dateTime('date'), time = dateTime('time');
        let resPriceInput = await currencyDB.getProductPriceByName(input_currency)
        let resPriceOutput = await currencyDB.getProductPriceByName(output_currency)
            resPriceOutput.forEach(async(element, index)=>{
                let price_id = resPriceInput[index].price_id
                let previous_price = resPriceInput[index].price
                let price = element.price / exchange_value
                element.price = parseFloat(price).toFixed(2)
                await priceDB.updatePrice(element.price, price_id)
                await priceDB.priceHistory(
                    user_id, 
                    price_id, 
                    element.price, 
                    previous_price, 
                    date, 
                    time
                )
            })

    } catch (error) {
        console.log(error)
    }
}