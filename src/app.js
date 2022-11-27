import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

import authRoutes from './routes/auth.routes'
import employeeRoutes from './routes/employee.routes'
import countEmployee from './routes/countEmployee.routes'
import payroll from './routes/payroll.routes'
import currencyRoutes from './routes/currency.routes'
import priceRoutes from './routes/price.routes'


import test from './routes/test.routes'

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
app.use('/api/price', priceRoutes) 

app.use('/api/test', test)

export default app;