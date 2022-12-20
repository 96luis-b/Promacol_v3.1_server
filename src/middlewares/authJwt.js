import * as authDB from '../helpers/auth_db'
import jwt from 'jsonwebtoken'
import config from '../config'
import { dateTime } from '../models/DateTime'


export const verifyToken = async (req, res, next) => {
    try {
        // console.log("body: ", req.body)
        const token = req.headers["x-access-token"]
        let decoded
        if (!token) return res.status(403).json({ status: 403, message: "No se proporciono un token" })
        decoded = jwt.verify(token, config.SECRET)
        // return res.status(401).json({ status: 401 })
        req.user_id = decoded.user_id
        const resUser = await authDB.getUserById(req.user_id)
        if (!resUser) return res.status(404).json({ status: 404, message: "Usuario no encontrado" })
        next();

    } catch (error) {
        console.error(error)
        return res.status(401).json({ status: 401, message: 'No autorizado' })
    }
}

export const checkDuplicateSession = async (req, res, next) => {
    try {
        const resCheck = await authDB.checkDuplicateSession(req.body.username)
        if (resCheck[0]?.status || null) {
            let resUser = await authDB.getUserByUsername(req.body.username)
            await authDB.logout(resUser[0].user_id, dateTime('date'), dateTime('time'))
            return res.status(401).json({ status: 401, message: 'Usted ya ha iniciado sesión \n Por seguridad seran cerradas todas las sesiones de este usuario' })
        }
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ status: 401, message: 'No autorizado' })
    }
}

