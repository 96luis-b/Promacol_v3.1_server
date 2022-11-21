import { Router } from "express";
import * as priceCtrl from '../controllers/price.controller'
import * as authJwt from '../middlewares/authJwt'


const router = Router()


router.get('/getExchangeRate', priceCtrl.getExchangeRate)

router.post('/updateExchangeRate',[authJwt.verifyToken], priceCtrl.updateExchangeRate)

export default router


