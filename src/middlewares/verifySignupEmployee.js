
import db from '../database'
import * as employeeDB from '../helpers/employee_db'

export const checkDuplicateIcEmployee = async (req, res, next) => {
 try {
      const resEmployee = await employeeDB.checkEmployeeByIc(req.body.id_number)
      if (resEmployee.length > 0) return res.status(400).json({ message: "La cedula de identidad ya existe" })
      next()
    } catch (error) {
      console.error(error)
      res.status(403).json({response:"Ha ocurrido un error al verificar "})
    }
  }