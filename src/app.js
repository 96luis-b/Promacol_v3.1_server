import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

import authRoutes from './routes/auth.routes'
import employeeRoutes from './routes/employee.routes'
import countEmployee from './routes/countEmployee.routes'
import payroll from './routes/payroll.routes'
import currencyRoutes from './routes/currency.routes'


import test from './routes/test.routes'

// import paymentRoutes from './routes/payment.routes'
// import resportWorker from './routes/reportWorker.routes'
// import dataProduction from './routes/dataProduction.routes'
// import weighing from './routes/weighing.routes'
// import product from './routes/product.routes'


// import {createRoles} from './libs/initialSetup'


// createRoles()

app.use(cors())

app.use(express.json()) 
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('hellopopopo');
    res.end();
})


app.use('/api/auth', authRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/countEmployee', countEmployee)
app.use('/api/payroll', payroll) 
app.use('/api/currency', currencyRoutes) 


app.use('/api/test', test)

// app.use('/api/payment', paymentRoutes)
// app.use('/api/reportWorker', resportWorker)
// app.use('/api/production', dataProduction)
// app.use('/api/weighing', weighing)
// app.use('/api/product', product)


export default app;