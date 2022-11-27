const employee = {
   
    signupEmployee: `INSERT INTO employee
        (room_id, ident_document_id, emp_code, name1, name2, lastname1, lastname2, 
        id_number, email, phone, birthday, address, hide_date, dismiss_date, status) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    registerJobByEmployee: `INSERT INTO employee_job (job_id, employee_id, date_in, time_in, status)
        VALUES(?, ?, ?, TRUE)`,
    getLastIdByEmploye: ` SELECT MAX(employee_id) AS employee_id FROM employee`,
    getJob: `SELECT * FROM job`,
    checkEmployeeByIc: `SELECT id_number FROM employee WHERE id_number=?`,
    getLastInsertId: `SELECT LAST_INSERT_ID()`,
    getCountEmployeeByCategoy: `SELECT COUNT(EJ.employee_id) AS count FROM employee_job AS EJ
        INNER JOIN job AS J ON J.job_id=EJ.job_id WHERE J.category_id=?`,
    getCategoryByIdJob: `SELECT C.category_id, C.category_name FROM job J INNER JOIN category C ON J.category_id=C.category_id
        WHERE J.job_id=?`,
    registerJobByEmployee: `INSERT INTO employee_job(job_id, employee_id, date_in, time_in, date_out, time_out, status) VALUES(?,?,?,?,?,?,?)`,
    getJobName: `SELECT job_name FROM job`,
    updateEmployee: `UPDATE employee SET name1=?, name2=?, lastname1=?, lastname2=?, 
        id_number=?, phone=?, birthday=? WHERE emp_code=?`,
    getJobByEmployeeCode: `SELECT EJ.job_id, EJ.employee_id FROM employee E 
        INNER JOIN employee_job EJ ON E.employee_id=EJ.employee_id WHERE E.emp_code=?`,
    updateEmployeeJob: `UPDATE employee_job SET job_id=? WHERE employee_id=? `,
    getEmployeeByCode: `SELECT E.employee_id, E.emp_code, E.name1, E.name2, E.lastname1, E.lastname2, E.id_number, E.phone, E.birthday, J.job_id, J.job_name
       FROM employee AS E 
       INNER JOIN employee_job AS EJ ON EJ.employee_id = E.employee_id
       INNER JOIN job AS J ON J.job_id = EJ.job_id
       WHERE E.emp_code=? OR  E.employee_id = ?`,
    getEmployeeByIdentity: `SELECT E.employee_id, E.emp_code, E.name1, E.name2, E.lastname1, E.lastname2, E.id_number, E.phone, E.birthday, J.job_id, J.job_name
       FROM employee AS E 
       INNER JOIN employee_job AS EJ ON EJ.employee_id = E.employee_id
       INNER JOIN job AS J ON J.job_id = EJ.job_id
       WHERE E.id_number=?`,
    getAssistanceEmployee: `SELECT A.employee_id, A.date_in, A.time_in, A.status FROM assistance AS A
        INNER JOIN employee AS E ON A.employee_id=E.employee_id
        WHERE E.emp_code=? AND A.date_in=?`,
    ckeckInEmployee: `INSERT INTO assistance(employee_id, date_in, time_in, date_out, time_out, status) 
        VALUES(?, ?, ?, null, null, TRUE)`,
    getIdEmployeeByCode: `SELECT employee_id FROM employee WHERE emp_code=?`,
    checkOutEmployee: `UPDATE assistance SET date_out=?, time_out=?, status=FALSE  WHERE employee_id=?`,
    checkIn: `INSERT INTO assistance`,
    removeAssistance: `DELETE FROM assistance WHERE employee_id=? AND date_in=? AND status=TRUE `,
    getPieceWorkJob: `SELECT * FROM job WHERE category_id = 2`,
    getEmployeeByCategory: `SELECT C.category_id, J.job_id, J.job_name, 
        E.employee_id, E.emp_code, E.name1, E.name2, E.lastname1, E.lastname2, E.id_number
        FROM category AS C
        INNER JOIN job AS J ON J.category_id = C.category_id
        INNER JOIN employee_job AS EJ ON EJ.job_id = J.job_id
        INNER JOIN employee AS E ON E.employee_id = EJ.employee_id
        INNER JOIN worker_production AS WP ON E.employee_id = WP.employee_id
        WHERE C.category_id = ? AND start_date = ?
        GROUP BY J.job_id, C.category_id, E.employee_id
        ORDER BY J.job_id ASC`,
    getEmployeeAssist:`  SELECT E.employee_id, E.emp_code, E.name1, E.name2, E.lastname1, E.lastname2, E.id_number, 
        DATE_FORMAT(A.date_in,'%d/%m/%Y') AS date_in, A.time_in, A.time_out, J.job_id, J.job_name FROM employee AS E
        INNER JOIN assistance AS A ON A.employee_id = E.employee_id
        INNER JOIN employee_job AS EJ ON EJ.employee_id = E.employee_id
        INNER JOIN job AS J ON J.job_id = EJ.job_id
        WHERE A.date_in = ? AND J.category_id = ?
        ORDER BY J.job_id ASC`,
    getProductionByJobGroup: `SELECT P.prod_id, P.prod_name, SUM(WPD.quantity) AS quantity FROM product AS P
    INNER JOIN worker_production_detail AS WPD ON WPD.prod_id = P.prod_id
    WHERE WPD.date=? GROUP BY P.prod_id ORDER BY P.prod_id ASC`,
}

export default employee