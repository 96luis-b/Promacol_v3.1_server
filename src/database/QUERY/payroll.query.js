const payroll = {

	getPayrollEmployee: `SELECT C.coin_id, C.name, C.abbrev, PRICE.price, P.prod_id, P.prod_name  FROM coin AS C
	    INNER JOIN price PRICE ON C.coin_id=PRICE.coin_id
	    INNER JOIN product_price AS PP ON PRICE.price_id=PP.price_id
	    INNER JOIN product AS P ON PP.prod_id=P.prod_id
	    WHERE C.coin_id = ?`,
	// getExchangeRate: `SELECT PRICE.coin_id, PRICE.price, EP.exchange_id, ER.input_currency, ER.output_currency, ER.exchange_value FROM price AS PRICE
	// 	INNER JOIN exchange_price AS EP ON PRICE.price_id=EP.price_id
	// 	INNER JOIN exchange_rate AS ER ON EP.exchange_id=ER.exchange_id
	// 	WHERE PRICE.coin_id = ?`,
	// getExchangeRate: `SELECT PRICE.currency_id, PRICE.price, PP.prod_id, EP.exchange_id, ER.input_currency, 
	// 	ER.output_currency, ER.exchange_value FROM price AS PRICE
	// 	INNER JOIN exchange_price AS EP ON PRICE.price_id=EP.price_id
	// 	INNER JOIN product_price AS PP ON PP.price_id = PRICE.price_id
	// 	INNER JOIN exchange_rate AS ER ON EP.exchange_id=ER.exchange_id
	// 	WHERE PRICE.currency_id = ?`,
	// getProductPrice: `SELECT PRICE.currency_id, PRICE.price, PP.prod_id, EP.exchange_id, ER.input_currency, 
	// 	ER.output_currency, ER.exchange_value FROM price AS PRICE
	// 	INNER JOIN product_price AS PP ON PP.price_id = PRICE.price_id
	// 	WHERE PRICE.currency_id = ?`,
	getProductPrice: `SELECT PRICE.currency_id, PRICE.price, PP.prod_id, PP.prod_id FROM price AS PRICE
		INNER JOIN product_price AS PP ON PP.price_id = PRICE.price_id
		WHERE PRICE.currency_id = 1;`,
	getExchangeRate: `SELECT * FROM exchange_rate WHERE exchange_id=?`,
	registerPayEmployee: `INSERT INTO payroll(employee_id, user_id, date, time, total_bs)
		VALUES(?,?,?,?,?)`,
	registerDetailPayEmployee: `INSERT INTO payroll_detail(payroll_id, prod_id, worker_prod_id, employee_id, quantity, total_bs)
		VALUES(?,?,?,?,?,?)`,
	getPayrollExecuted: `SELECT Pay.payroll_id, DATE_FORMAT(Pay.date,'%d/%m/%Y') AS date, Pay.time, Pay.user_id,
		PD.payroll_detail_id, PD.worker_prod_id, PD.quantity, PD.total_bs, PD.employee_id,
		DATE_FORMAT(WP.start_date,'%d/%m/%Y') AS start_date, P.prod_id, P.prod_name, Pay.total_bs AS total_pay_bs
		FROM payroll AS Pay
		INNER JOIN payroll_detail AS PD ON PD.payroll_id = Pay.payroll_id
		INNER JOIN product AS P ON P.prod_id = PD.prod_id 
		INNER JOIN worker_production AS WP ON WP.worker_prod_id = PD.worker_prod_id
		WHERE Pay.date = ? `,
	allLatePay: `SELECT E.employee_id, E.emp_code, E.name1, E.name2, E.lastname1, E.lastname2, E.id_number,
		J.job_id, J.job_name, WP.worker_prod_id, WP.total, DATE_FORMAT(WP.start_date,'%Y-%m-%d') AS start_date FROM worker_production WP
		INNER JOIN employee AS E ON E.employee_id = WP.employee_id
		INNER JOIN employee_job AS EJ ON EJ.employee_id = E.employee_id
		INNER JOIN job AS J ON J.job_id = EJ.job_id
		WHERE WP.status='false'
		ORDER BY J.job_id ASC`,

}

export default payroll