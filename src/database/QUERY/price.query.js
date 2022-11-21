const price = {
    getExchangeRate: `SELECT * FROM exchange_rate`,
    updateExchangeRate: `UPDATE exchange_rate SET exchange_value = ? WHERE exchange_id=?`,
}

export default price