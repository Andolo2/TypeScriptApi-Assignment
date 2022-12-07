const express = require ('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchema_EXPRESS')


/********************************************************************************************************************/ 

// Unsecured Routes
controller.route('/').get(async (httpRequest, httpResponse) =>  {

   try{
          const product = await productSchema.find()
          httpResponse.status(200).json(product)
                //{ success: true, message: 'All products has been added ', data: product }
        } catch{
        httpResponse.status(400).json({ success: false, message: 'No products has been added ', data: product })
        }

})

/********************************************************************************************************************/ 

controller.route('/:tag').get(async(httpRequest, httpResponse, tag) =>  { // product based on tag
       const products = await productSchema.find({tag: httpRequest.params.tag})
       if(products){
        httpResponse.status(200).json(products)
       } else
       httpResponse.status(400).json()

})     

/********************************************************************************************************************/ 

controller.route('/:tag/:take').get(async(httpRequest, httpResponse) =>  { // ex url: http://localhost:5000/api/products/featured/1
        const products = await productSchema.find({tag: httpRequest.params.tag}).limit(httpRequest.params.take)
        if(products){
                httpResponse.status(200).json(products)
        } else
        httpResponse.status(400).json()

})

/********************************************************************************************************************/ 

controller.route('/product/details/:articleNumber').get(async(httpRequest, httpResponse) =>  { // Get based on articleNumber

        const product = await productSchema.findById(httpRequest.params.articleNumber)
        if(product){
         httpResponse.status(200).json(product)
        } else
        httpResponse.status(404).json()
})

/********************************************************************************************************************/ 


// Secure routes


module.exports = controller