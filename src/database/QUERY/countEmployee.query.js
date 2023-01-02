const countEmployee = {
	searchEmployee: `SELECT E.employee_id, E.emp_code, E.name1, E.name2, E.lastname1, E.lastname2, E.id_number, 
		J.job_id, J.job_name FROM employee AS E
		INNER JOIN employee_job AS EJ ON E.employee_id = EJ.employee_id
		INNER JOIN job AS J ON J.job_id = EJ.job_id
		WHERE E.emp_code=?`,
	getEmployeeProduction: `SELECT WP.worker_prod_id, WP.employee_id, WP.start_date, WP.total, WP.status FROM worker_production AS WP
		INNER JOIN employee AS E ON WP.employee_id = E.employee_id
		WHERE E.emp_code=? AND WP.start_date BETWEEN ? AND ? `,
	getEmpProductionByStatus: `SELECT WP.worker_prod_id, WP.employee_id, WP.start_date, WP.total, WP.status FROM worker_production AS WP
	INNER JOIN employee AS E ON WP.employee_id = E.employee_id
	WHERE E.emp_code=? AND WP.start_date BETWEEN ? AND ? AND WP.status=?`,
	getEmployeeProductionDetail: `SELECT WPD.prod_id, WPD.quantity, P.prod_name FROM worker_production_detail AS WPD
		INNER JOIN product AS P ON WPD.prod_id = P.prod_id
		WHERE WPD.worker_prod_id=? AND date=?`,
	getEmpProducDetail: `SELECT prod_id, quantity FROM worker_production_detail WHERE worker_prod_id=?`,
	getEmpProducDetailByProduct: `SELECT WPD.prod_id, P.prod_name, SUM(WPD.quantity) as quantity 
		FROM worker_production_detail AS WPD
		INNER JOIN product AS P ON WPD.prod_id = P.prod_id
		WHERE WPD.worker_prod_id = ?
		GROUP BY WPD.prod_id
		ORDER BY WPD.prod_id ASC`,
	getProductJob: `SELECT P.prod_id, P.prod_name FROM employee AS E
		INNER JOIN employee_job AS EJ ON E.employee_id = EJ.employee_id
		INNER JOIN job AS J ON J.job_id = EJ.job_id
		INNER JOIN product_job AS PJ ON PJ.job_id = J.job_id
		INNER JOIN product AS P ON P.prod_id = PJ.prod_id
		WHERE E.emp_code=?`,
	getProductJobByIdEmp: `SELECT P.prod_id, P.prod_name FROM employee AS E
		INNER JOIN employee_job AS EJ ON E.employee_id = EJ.employee_id
		INNER JOIN job AS J ON J.job_id = EJ.job_id
		INNER JOIN product_job AS PJ ON PJ.job_id = J.job_id
		INNER JOIN product AS P ON P.prod_id = PJ.prod_id
		WHERE E.employee_id=?`,
	newEmployeeProduction: ` INSERT INTO worker_production(employee_id, total, start_date, start_time, status)
		VALUES(?, ?, ?, ?, TRUE)`,
	newDetailProduction: `INSERT INTO worker_production_detail
		(worker_prod_id, user_id, prod_id, employee_id, quantity, date, time)
		VALUES(?, ?, ?, ?, ?, ?, ?)`,
	updateTotalProduction: `UPDATE worker_production SET total=? WHERE worker_prod_id=?`,
	getEmpProduction: `  SELECT WP.employee_id, WP.worker_prod_id, WP.start_date, WPD.prod_id, P.prod_name, 
		SUM(WPD.quantity) as quantity FROM worker_production_detail AS WPD
		INNER JOIN worker_production AS WP ON WPD.worker_prod_id = WP.worker_prod_id
		INNER JOIN product AS P ON WPD.prod_id = P.prod_id
		WHERE WP.employee_id = ? AND WP.start_date = ?
		GROUP BY WP.employee_id, WP.start_date, WPD.prod_id, 
		WPD.prod_id, P.prod_name, P.prod_name, WP.worker_prod_id
		ORDER BY WPD.prod_id ASC`,
	updateEmpProductin: `UPDATE worker_production SET status = FALSE WHERE worker_prod_id=?`,
	getProdByName: `SELECT * FROM product WHERE prod_name=?`,
}



export default countEmployee