import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcryptjs'
import * as priceDB from '../helpers/price_db'
import { dateTime } from '../models/DateTime'

export const getExchangeRate = async (req, res) => {
    try {
        console.log("getExchangeRate")
        const resExchRate = await priceDB.getExchangeRate()
        console.log("resExchRate: ", resExchRate)

        res.status(200).json({ status: 200, message: "Ok", body: resExchRate })
        // res.status(500).json({ status: 500, message: "Ha ocurrido un error inesperado" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const updateExchangeRate = async (req, res) => {
    try {
        console.log("updateExchangeRate")
        const { exchange_id, exchange_value } = req.body
        const date = dateTime('date'), time = dateTime('time');
        console.log("req.body: ", req.body)
        const resExchange = await priceDB.updateExchangeRate(exchange_value, exchange_id)
        await priceDB.exchangeRateHistory(exchange_id, req.user_id, exchange_value, date, time)
        console.log("resExchange: ", resExchange)
        res.status(200).json({ status: 200, message: "Cambios realizados con exito" })
        // res.status(500).json({ status: 500, message: "Ha ocurrido un error inesperado" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}
