import * as authDB from '../helpers/auth_db'
import * as countEmployeeDB from '../helpers/countEmployee_db'
import * as employeeDB from '../helpers/employee_db'
import { dateTime, orderDate } from '../models/DateTime'
// import { generateCode } from '../models/CodeEmployee'


export const searchCountEmployee = async (req, res) => {
    try {
        const { parameter } = req.params
        let total = 0;
        let resEmployee = await countEmployeeDB.searchEmployee(`OB-${parameter}`)
        let resAssistance = await employeeDB.getAssistanceEmployee(`OB-${parameter}`, dateTime("date"))
        if (resAssistance.length == 0) return res.status(403).json({ status: 403, message: "No tiene registro de asistencia" })
        let resProdJob = await countEmployeeDB.getProductJob(`OB-${parameter}`)
        let resProduction = await countEmployeeDB.getEmployeeProduction(`OB-${parameter}`, dateTime("date"), dateTime("date"))
        if (resProduction.length == 0) {
            resProdJob.forEach(prod => {
                prod.quantity = 0
            });

            return res.status(200).json({
                status: 200,
                message: "Ok",
                body: { employee: resEmployee[0], production: resProdJob, total: total }
            })
        }

        let resProdDetail = await countEmployeeDB.getEmpProducDetail(resProduction[0].worker_prod_id)

        resProdJob.forEach(prod => {
            prod.quantity = 0
            resProdDetail.forEach(element => {
                if (prod.prod_id == element.prod_id) {
                    prod.quantity = prod.quantity + element.quantity
                }
            });
            total = total + prod.quantity
        });

        res.status(200).json({
            status: 200, message: "Ok", body: {
                employee: resEmployee[0],
                production: resProdJob,
                total: total,
                status: resProduction[0].status
            }
        })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}


export const moreLess = async (req, res) => {
    try {
        const { employee, product, status } = req.body
        if (status == false) {
            return res.status(401).json({
                status: 401,
                message: `El registro de producción del empleado ${employee.emp_code} no puede ser editado`
            })
        }
         let total = 0
         let date = dateTime("date"), time = dateTime("time");
         let resAssistance = await employeeDB.getAssistanceEmployee(employee.emp_code, date)
         if(resAssistance.length == 0){
             return res.status(401).json({ status: 401, message: "No hay registro de asistencia", body: {}})
         }
         let resProduction = await countEmployeeDB.getEmployeeProduction(employee.emp_code, date, date)
         if(resProduction.length == 0) {
             (async function(){ 
             let resNewProduciton = await countEmployeeDB.newEmployeeProduction(employee.employee_id, 1, date, time)
             await countEmployeeDB.newDetailProduction(resNewProduciton.insertId, req.user_id, product.prod_id, employee.employee_id, product.value, date, time )
             return
           })();  
             return res.status(200).json({ status: 200, message: "Ok", body: {}})
         }

         let resProdDetail = await countEmployeeDB.getEmpProducDetail(resProduction[0].worker_prod_id)
         let resProdJob = await countEmployeeDB.getProductJob(employee.emp_code)
         resProdJob.forEach(prod => {
             prod.quantity = 0
             resProdDetail.forEach(element => {
                 if(prod.prod_id == element.prod_id){
                     prod.quantity = prod.quantity + element.quantity
                 }
             });
             total = total + prod.quantity
         });
         total = total + product.value
         await countEmployeeDB.updateTotalProduction(resProduction[0].worker_prod_id, total)
         await countEmployeeDB.newDetailProduction(resProduction[0].worker_prod_id, req.user_id, product.prod_id, employee.employee_id, product.value, date, time )

        res.status(200).json({ status: 200, message: "Ok", body: {}})
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

