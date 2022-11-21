const price = {
    getExchangeRate: `SELECT * FROM exchange_rate`,
    updateExchangeRate: `UPDATE exchange_rate SET exchange_value = ? WHERE exchange_id=?`,
    exchangeRateHistory: `INSERT INTO history_exchange (exchange_id, user_id, exchange_value, date, time) VALUES (?, ?, ?, ?, ?)`
}



export default price