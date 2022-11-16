import { Router } from "express";
import * as currencyCtrl from '../controllers/currency.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()

// router.get('/logout/:user_id', authCtrl.logout)


router.get('/getCurrency', currencyCtrl.getCurrencies) 
router.post('/updateExchangeRate', currencyCtrl.updateExchangeRate) 
 
router.get('/getProductPrice', currencyCtrl.getProductPrice) 
router.post('/updateProdPrice', currencyCtrl.updateProdPrice) 



// router.post('/signin', coinCtrl.getCoin)  
// router.post('/signin', currencyCtrl.signin)  
// router.post('/signin', currencyCtrl.signin)  


export default router


