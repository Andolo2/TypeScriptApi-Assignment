

const express = require ('express')
const controller = express.Router()
let products = require('../data/simulated_database')


controller.param("tag", (httpRequest, httpResponse,tag, next) => {

    //httpRequest.products.filter(products => products.tag === tag)
    //next()
    
    //httpRequest.products.includes('tag')
    //next()

    httpRequest.products = products.find(products => products.tag === tag)
    next()
    
})


//Get all products

controller.route('/').get((httpRequest, httpResponse) =>  {

    httpResponse.status(201).json(products)

})


// get all products with 'feature tag'
controller.route('/:tag').get((httpRequest, httpResponse) =>  {

    if(httpRequest.products.length === 0){
        httpRequest.status(404).json()
    }
    else{
        httpResponse.status(201).json(products)
    }
    

})




module.exports = controller

