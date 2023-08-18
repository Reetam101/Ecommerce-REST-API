require('dotenv').config()

const express = require('express')

const path = require('path');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/db')
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')
const apicache = require('apicache')
// const addCategories = require('./testData');
// const addProducts = require('./testData');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const app = express()

const PORT = process.env.PORT || 5000;

connectDB();
// addProducts();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 10
})


app.use(limiter)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

let cache = apicache.middleware

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.get('/', (req, res) => res.sendFile('./swagger-output.json'))
app.use('/api/v1/user/auth', require('./routes/userRoutes'))
app.use('/api/v1/products', cache('2 minutes'), require('./routes/productRoutes'))
app.use('/api/v1/user/cart', cache('2 minutes'), require('./routes/cartRoutes'))
app.use('/api/v1/user/orders', cache('2 minutes'), require('./routes/orderRoutes'))
app.use('/api/v1/categories', cache('2 minutes'), require('./routes/categoryRoutes'))
app.use(notFound)
app.use(errorHandler)

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})

mongoose.connection.on('error', err => {
  console.log(err)
  console.log(err.code)
})