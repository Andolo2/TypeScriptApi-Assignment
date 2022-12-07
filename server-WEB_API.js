require('dotenv').config()

const WEBAPI_PORT = process.env.WEBAPI_PORT || 6666
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const initMongoDB = require('./server-MONGO_DB')



// middleWare

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

//app.listen(cors, console.log(`cors is running ${cors}`))

// Router/controllers

const productsController_NEW = require('./controllers/productsController_NEW')
app.use('/api/products', productsController_NEW)

const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)


// Start API`ss

initMongoDB()

app.listen(WEBAPI_PORT, console.log(`WEBAPI_PORT in running on port ${WEBAPI_PORT}`))



