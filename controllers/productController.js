

const express = require ('express')
const controller = express.Router()
let products = require('../data/simulated_database')


/********************************************************************************************************************/ 
// Param - Get product with articleNumber

controller.param("articleNumber", (httpRequest, httpResponse, next, articleNumber) => {
    httpRequest.product = products.find(x => x.articleNumber == articleNumber)
    next()
})

/********************************************************************************************************************/ 
// Param - get product with featureed tag

controller.param("tag", (httpRequest, httpResponse, next, tag) => {

    httpRequest.products = products.filter(x => x.tag == tag)
    next()
  
})

/********************************************************************************************************************/ 

//Get all products

controller.route('/').get((httpRequest, httpResponse) =>  {

    httpResponse.status(200).json(products)

})

/********************************************************************************************************************/ 


// get all products with 'feature tag'
controller.route('/:tag').get((httpRequest, httpResponse) =>  {
    if(httpRequest.products != undefined){
        httpResponse.status(200).json(httpRequest.products)
        
    }
    else{
        httpResponse.status(404).json()
        
    }
})

/********************************************************************************************************************/ 

//Get product vased on articleNumber (single prododuct)

controller.route('/details/:articleNumber').get((httpRequest, httpResponse) =>  {
    if(httpRequest.products != undefined){
        httpResponse.status(200).json(httpRequest.product)
        
    }
    else{
        httpResponse.status(404).json()
        
    }
})
/********************************************************************************************************************/ 

controller.route('/:tag/:take').get((httpRequest, httpResponse) =>  {
    let productList = [] // Save in array

    for (let i= 0; i < Number(httpRequest.params.take); i++)
        productList.push(httpRequest.products[i])
    
    if(httpRequest.products != undefined){
        httpResponse.status(200).json(productList)
        
    }
    else{
        httpResponse.status(404).json()
        
    }
})
/********************************************************************************************************************/ 


controller.param("id", (req, res, next, id) => {
    req.product = products.find(product => product.id == id)
    next()
})

 controller.route('/')
 .post((httpRequest, httpResponse) => {  // post - create - skapa produkt || http://localhost:5000/api/products
    let product = {
        id: (products[products.length -1])?.id > 0 ? (products[products.length -1])?.id + 1 : 1,
        name: httpRequest.body.name,
        description: httpRequest.body.description,
        category: httpRequest.body.category,
        price: httpRequest.body.price,
        rating: httpRequest.body.rating,
        imageName: httpRequest.body.imageName,
    }

    products.push(product)
    httpResponse.status(201).json(product)
 })

 .get((httpRequest, httpResponse) => { // Get - read - hämta alla produkter || http://localhost:5000/api/products
    
    httpResponse.status(200).json(products)
})




controller.route("/:id") // http://localhost:5000/api/products/1 
.get((httpRequest, httpResponse) => {
    
    if(httpRequest.product != undefined){
        httpResponse.status(200).json(httpRequest.product)
        
    }
    else
        httpResponse.status(404).json()
       
})
.put((httpRequest, httpResponse) => {

    if(httpRequest.product != undefined){
        products.forEach(product => {
            if(product.id == httpRequest.product.id) {
                product.name = httpRequest.body.name ? httpRequest.body.name : product.name
                product.description = httpRequest.body.description ? httpRequest.body.description : product.description
                product.category = httpRequest.body.category ? httpRequest.body.category : product.category
                product.price = httpRequest.body.price ? httpRequest.body.price : product.price
                product.rating = httpRequest.body.rating ? httpRequest.body.rating : product.rating
                product.imageName = httpRequest.body.imageName ? httpRequest.body.imageName : product.imageName
             
            }
        })
        httpResponse.status(200).json(httpRequest.product)
        
    }
    else
        httpResponse.status(404).json()
})



.delete((httpRequest, httpResponse) => {
    console.log('delteded')
    if(httpRequest.product != undefined){
        products = products.filter(product => product.id !== httpRequest.product.id)
        httpResponse.status(204).json()
    }
    else
        httpResponse.status(404).json()
})




module.exports = controller

