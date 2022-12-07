const express = require ('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchema_EXPRESS')

// Unsecured Routes
controller.route('/').get(async (httpRequest, httpResponse) =>  {

   try{
          const product = await productSchema.find()
          httpResponse.status(200).json({ success: true, message: 'All products has been added ', data: product })
                

         
                // ** Felsöknig **
                const ArrayTest = Array.isArray(product)
                console.log(ArrayTest) //  <---- Fick true

                const existsAndNotEmpty = product && product.length > 0 ? true : false
                console.log(existsAndNotEmpty) // <-- fick false'

                
                
              
              
          
        
   } catch{
      httpResponse.status(400).json({ success: false, message: 'No products has been added ', data: product })
   }

})

controller.route('/:tag').get((httpRequest, httpResponse) =>  {
 
})


controller.route('/:tag/:take').get((httpRequest, httpResponse) =>  {

})

controller.route('/details/:articleNumber').get((httpRequest, httpResponse) =>  {
 
})


// Secure routes


module.exports = controller