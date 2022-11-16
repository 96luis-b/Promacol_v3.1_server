import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcryptjs'
import * as authDB from '../helpers/auth_db'
import { dateTime } from '../models/DateTime'

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body
        const resUser = await authDB.getUserByUsername(username)
        let roles = []
        if (await comparePassword(password, resUser[0].password)) {
            const resRole = await authDB.getUserRole(resUser[0].user_id)
            resRole.forEach(element => { roles.push(element.role_id) });
            await authDB.newSession(resUser[0].user_id, dateTime('date'), dateTime('time'))
            const token = jwt.sign({ user_id: resUser[0].user_id, role: resRole }, config.SECRET, { expiresIn: 80000 })
            res.status(200).json({
                status: 200,
                message: "Usted ha iniciado sesión correctamente",
                body: {
                    token,
                    user_id: resUser[0].user_id,
                    role: roles
                }
            })
            return
        } else {
            return res.status(403).json({ status: 403, message: "Los datos ingresados son incorrectos" })
        }
        // res.status(200).json({ status: 200, message: "respuesta" })
        // res.status(500).json({ status: 500, message: "Ha ocurrido un error inesperado" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const logout = async (req, res) => {
    try {
        const { user_id } = req.params
        await authDB.logout(user_id, dateTime('date'), dateTime('time'))
        res.status(200).json({ status: 200, message: "Ok" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const checkUser = async (req, res) => {
    try {
        const { user_id } = req
        const { role } = req.body
        console.log("user_id: ", user_id)
        console.log("role: ", role)
        // let resCheck = await authDB.checkUser(user_id, role[0])
        // if(resCheck == false) return res.status(403).json({ status: 403, message: "Acceso no autorizado" })
        res.status(200).json({ status: 200, message: "Ok" })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}


const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compareSync(password, receivedPassword)
}

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}
