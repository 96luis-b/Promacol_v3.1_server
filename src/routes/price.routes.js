import { Router } from "express";
import * as priceCtrl from '../controllers/price.controller'

const router = Router()


router.get('/getExchangeRate', priceCtrl.getExchangeRate)

router.post('/updateExchangeRate', priceCtrl.updateExchangeRate)

export default router


