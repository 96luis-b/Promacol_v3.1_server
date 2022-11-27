import { Router } from "express";
import * as currencyCtrl from '../controllers/currency.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()

router.post('/updateExchangeRate', currencyCtrl.updateExchangeRate) 
router.post('/updateProdPrice', currencyCtrl.updateProdPrice) 
 
router.get('/getProductPrice', currencyCtrl.getProductPrice) 
router.get('/getCurrency', currencyCtrl.getCurrencies) 


export default router


