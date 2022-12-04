const port = process.env.PORT || 5000
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')




// middleWare

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

//app.listen(cors, console.log(`cors is running ${cors}`))

// Router/controllers

const productsController = require('./controllers/productController')
app.use('/api/products', productsController)

const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)






app.listen(port, console.log(`app in running on ${port}`))



