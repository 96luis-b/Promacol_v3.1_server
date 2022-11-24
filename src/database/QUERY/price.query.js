const price = {
    getExchangeRate: `SELECT * FROM exchange_rate`,
    updateExchangeRate: `UPDATE exchange_rate SET exchange_value = ? WHERE exchange_id=?`,
    exchangeRateHistory: `INSERT INTO history_exchange (exchange_id, user_id, exchange_value, date, time) VALUES (?, ?, ?, ?, ?)`,
    priceHistory: `INSERT INTO history_price (user_id, price_id, actual_price, previous_price, date, time) VALUES (?, ?, ?, ?, ?, ?)`,
    updatePrice: `UPDATE price SET price = ? WHERE price_id=?`,
    getPrice: `SELECT * FROM price WHERE price_id=?`,
}



export default price