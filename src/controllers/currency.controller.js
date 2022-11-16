import * as currencyDB from '../helpers/currency_db'
import * as countEmployeeDB from '../helpers/countEmployee_db'
import { dateTime } from '../models/DateTime'

export const getCurrencies = async (req, res) => {
    try {

        let resCurrency = await currencyDB.getCurrencies()
        let resExchRate = await currencyDB.getExchangeRate()
        res.status(200).json({ status: 200, message: "Ok", body: { currency: resCurrency, exchangeRate: resExchRate } })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const updateExchangeRate = async (req, res) => {
    try {
        const { input_currency, output_currency, exchange_value } = req.body
        let resCurrency = await currencyDB.updateExchangeRate(input_currency, output_currency, exchange_value)

        res.status(200).json({ status: 200, message: "Ok", body: { currency: resCurrency, exchangeRate: resExchRate } })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const getProductPrice = async (req, res) => {
    try {
        let resProductPrice = await currencyDB.getProductPrice()
        let data = []
        // let after = 1
        let after = null
        var hash = {};
        // let array = resProductPrice.filter(function(current) {
        //   var exists = !hash[current.prod_id];
        //   hash[current.prod_id] = true;
        //   return exists;
        // });
        
        // resProductPrice.forEach((prod, i, pack) => {
        //     let group = [];
        //     let status = prod.prod_id 
        //     if(status != after){
        //         group = pack.filter(e => e.prod_id == prod.prod_id);
        //         group.sort(((a, b) => a.prod_id - b.prod_id))
        //         data.push({ group: group, prod_name: prod.prod_name })
        //     }
        //     after = prod.prod_id
        // }); 

        // console.log(JSON.stringify(array));
        // console.log("array: ", array);
        resProductPrice.forEach((prod, i, pack) => {
            // console.log("pack: ", pack)
            let group = [];
            let status = prod.prod_id 
            if(status != after){
                group = pack.filter(e => e.prod_id == prod.prod_id);
                group.sort(((a, b) => a.price_id - b.price_id))
                // console.log("group: ", group)
                data.push({ group: group, prod_name: prod.prod_name })
            }
            after = prod.prod_id
           
        })
        res.status(200).json({ status: 200, message: "Ok", body: data})
        // res.status(200).json({ status: 200, message: "Ok" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" }) 
    }
}
 
export const updateProdPrice = async (req, res) => {
    try {
        const {prod_name, price_id, currency_id, currency_name, price} = req.body

        if(price_id){
            await currencyDB.updateProdPrice(price, currency_id, price_id)
            return res.status(200).json({ status: 200, message: "Ok" })
        }

        let resCurrency = await currencyDB.getCurrencyByName(currency_name)
        let resProd = await countEmployeeDB.getProdByName(prod_name)
        let resNewPrice = await currencyDB.newPrice(resCurrency[0].currency_id, parseFloat(price))
        let resNewProdPrice = await currencyDB.newProductPrice(resProd[0].prod_id, resNewPrice.insertId)
       
        res.status(200).json({ status: 200, message: "Ok", body: {
            prod_name: prod_name, 
            currency_id: resCurrency[0]?.currency_id || null, 
            currency_name: currency_name, 
            price:price,
            price_id: resNewPrice?.insertId || null
        }})


         //res.status(200).json({ status: 200, message: "Ok", body: {} })
         
    } catch (error) {
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}