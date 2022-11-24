
const currency = {
    getCurrencies: `SELECT * FROM currency`,
    getExchangeRate: `SELECT * FROM exchange_rate`,
    updateExchangeRate: `UPDATE exchange_rate SET exchange_value = ?
        WHERE input_currency = ?`,
    getProductPrice: `SELECT P.prod_id, P.prod_name, PRICE.price_id, PRICE.price, 
        C.currency_id, C.name, C.abbrev FROM product AS P
        INNER JOIN product_price AS PP ON PP.prod_id = P.prod_id
        INNER JOIN price AS PRICE ON PRICE.price_id = PP.price_id 
        INNER JOIN currency AS C ON C.currency_id = PRICE.currency_id
        ORDER BY P.prod_id`,
    getProductPriceByName: ` SELECT P.prod_id, P.prod_name, PRICE.price_id, PRICE.price, 
        C.currency_id, C.name, C.abbrev FROM product AS P
        INNER JOIN product_price AS PP ON PP.prod_id = P.prod_id
        INNER JOIN price AS PRICE ON PRICE.price_id = PP.price_id 
        INNER JOIN currency AS C ON C.currency_id = PRICE.currency_id
        WHERE C.name = ? ORDER BY P.prod_id;`,
    updateProdPrice: `UPDATE price SET price = ?
        WHERE currency_id = ? AND price_id=?`,
    getCurrencyByName: `SELECT * FROM currency WHERE name = ?`,
    newPrice: `INSERT INTO price(currency_id, price)
        VALUES(?, ?)`,
    newProductPrice: `INSERT INTO product_price (prod_id, price_id)
        VALUES(?, ?)`,
}

export default currency
 