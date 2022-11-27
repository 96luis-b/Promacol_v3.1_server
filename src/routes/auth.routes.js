import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller'
// import * as verifySignup from "../middlewares/verifySignup";
import * as authJwt from '../middlewares/authJwt'

const router = Router()

router.get('/logout/:user_id', authCtrl.logout)

router.post('/signin',[authJwt.checkDuplicateSession], authCtrl.signin)  
router.post('/checkUser',[authJwt.checkDuplicateSession], authCtrl.checkUser)  


export default router


