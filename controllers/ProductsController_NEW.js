const express = require ('express')
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


controller.route('/').post(async(httpRequest, httpResponse) => {

        const {name, description, price, category, tag, imageName, rating } = httpRequest.body
        console.log(httpRequest.body);

        if(!name || !price ){
                httpResponse.status(400).json({Text: 'Name and price is required '})
               
        }
        const product_exits = await productSchema.findOne({name})
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





module.exports = controller