const express = require ('express')
const { updateOne } = require('../schemas/productSchema_EXPRESS')
const controller = express.Router()

const productSchema = require('../schemas/productSchema_EXPRESS')


/****Unsecured Routes********Unsecured Routes********Unsecured Routes********Unsecured Routes********Unsecured Routes********Unsecured Routes****/ 

// Unsecured Routes
controller.route('/').get(async (httpRequest, httpResponse) =>  {

        const products = []

        const productList = await productSchema.find()
        if(productList){
                
                for( let product of productList){
                        products.push({
                                articleNumber: product._id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                category: product.category,
                                tag: product.tag,
                                imageName: product.imageName,
                                rating: product.rating

                        })
                }

                httpResponse.status(200).json(products)
                console.log(products)
        } 
        else
        httpResponse.status(400).json()

})

/********************************************************************************************************************/ 

controller.route('/:tag').get(async(httpRequest, httpResponse, tag) =>  { // product based on tag

        const products = []

        const productList = await productSchema.find({tag: httpRequest.params.tag})
        if(productList){
                
                for( let product of productList){
                        products.push({
                                articleNumber: product._id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                category: product.category,
                                tag: product.tag,
                                imageName: product.imageName,
                                rating: product.rating

                        })
                }

                httpResponse.status(200).json(products)
                
        } 
        else
        httpResponse.status(400).json()

})     

/********************************************************************************************************************/ 

controller.route('/:tag/:take').get(async(httpRequest, httpResponse) =>  { // ex url: http://localhost:5000/api/products/featured/1
        
        const products = []
        
        const productList = await productSchema.find({tag: httpRequest.params.tag}).limit(httpRequest.params.take)
        if(productList){
                
                for( let product of productList){
                        products.push({
                                articleNumber: product._id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                category: product.category,
                                tag: product.tag,
                                imageName: product.imageName,
                                rating: product.rating

                        })
                }

                httpResponse.status(200).json(products)

        } 
        else
        httpResponse.status(400).json()

})

/********************************************************************************************************************/ 

controller.route('/product/details/:articleNumber').get(async(httpRequest, httpResponse) =>  { // Get based on articleNumber

        const product = await productSchema.findById(httpRequest.params.articleNumber)
        if(product){
                
                if(product){
                 
                httpResponse.status(200).json({

                        articleNumber: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        category: product.category,
                        tag: product.tag,
                        imageName: product.imageName,
                        rating: product.rating

                        })
                } 
                else
                httpResponse.status(400).json()
        
        } else
        httpResponse.status(404).json()
})

/********************************************************************************************************************/ 


/*******Secured Routes***************Secured Routes***************Secured Routes***************Secured Routes***************Secured Routes********/


/* Create product */
controller.route('/').post(async(httpRequest, httpResponse) => { // Create a product

        const {name, description, price, category, tag, imageName, rating } = httpRequest.body
       

        if(!name || !price ){ // name + price = required
                httpResponse.status(400).json({Text: 'Name and price is required '})
               
        }
        const product_exits = await productSchema.findOne({name}) // If new product contais the same name, run status 409 or create a new product. 
        if(product_exits){
                httpResponse.status(409).json({ success: true, message: 'Can´t create duplicate '})
        }else{
                const product = await productSchema.create({
                        name,
                        description,
                        price,
                        category,
                        tag,
                        imageName,
                        rating
                })
                if(product){
                        httpResponse.status(201).json({success: true, message: `product with articlenumber ${product._id} was created`})
                }else{
                        httpResponse.status(400).json({success: true,message: 'Can´t create product '})
                }
        }
})

/* delete product */

controller.route('/:articleNumber').delete(async(httpRequest, httpResponse) => {
        if(!httpRequest.params.articleNumber){
                httpResponse.json(400).json({success: true, message: 'articlenumber not found.'})
        }
        else{
                const product = await productSchema.findById(httpRequest.params.articleNumber)


                if(product){
                        await productSchema.remove(product)
                        httpResponse.status(200).json({success: true, message: `product with articlenumber ${httpRequest.params.articleNumber} was deleted.`})
                }
                else{
                        httpResponse.status(404).json({success: true, message: `product with articlenumber ${httpRequest.params.articleNumber} was not found.`})
                }
        }
})
   


/*    controller.route('/:articleNumber').put(async(httpRequest, httpResponse) => {
        let result = await productSchema.updateOne(
                
                {articleNumber: httpRequest.params.articleNumber},
               
                {$set: httpRequest.body}
                
                
        )
 
        httpResponse.send(result)
        
       
})  */
   


controller.route('/:articleNumber').put(async(httpRequest, httpResponse) => {
        if(!httpRequest.params.articleNumber){
                httpResponse.json(400).json({success: true, message: 'articlenumber not found.'})
        }
        else{
                const product = await productSchema.findById(httpRequest.params.articleNumber)
                const {name} = httpRequest.body


                if(product){
                        await productSchema.findByIdAndUpdate(
                                httpRequest.params.articleNumber, httpRequest.body, {
                                        name: httpRequest.body.name
                                }
                                
                                )
                                httpResponse.status(200).json()
                                console.log('kör1')
                                
                }
                else{
                        httpResponse.status(404).json({success: true, message: `product with articlenumber ${httpRequest.params.articleNumber} was not found.`})
                }
        }
})
   
 


      
module.exports = controller