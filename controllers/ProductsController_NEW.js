const express = require ('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchema_EXPRESS')


/****Unsecured Routes********Unsecured Routes********Unsecured Routes********Unsecured Routes********Unsecured Routes********Unsecured Routes****/ 

// Unsecured Routes
controller.route('/').get(async (httpRequest, httpResponse) =>  { // List all products

        const products = []

        const productList = await productSchema.find()
        if(productList){
                
                for( let product of productList){
                        products.push({
                                articleNumber: product._id, // SetarticleNumber to match _ID from mongoDB.
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
   


/*Update Product*/

controller.route('/:articleNumber').put(async(httpRequest, httpResponse) => {
        if(!httpRequest.params.articleNumber){ /*If an articleNumber is not found, return 400 */
                httpResponse.json(400).json({success: true, message: 'articlenumber not found.'})
        }
        else{
                const product = await productSchema.findById(httpRequest.params.articleNumber) /*Use findbyID to find correct articleNumber */
                const {articleNumber} = httpRequest.body


                if(product){ /*If a product is found, this will run */
                        await productSchema.findByIdAndUpdate( /* Creates a findOneAndUpdate query, filtering by the given _id.*/
                                httpRequest.params.articleNumber, httpRequest.body, {
                                        articleNumber: httpRequest.body.articleNumber
                                }
                                
                                )
                                httpResponse.status(200).json({success: true, message: `product with articlenumber ${httpRequest.params.articleNumber} was updated.`}) // If true, product is updated.                        
                }
                else{
                        httpResponse.status(400).json({success: true, message: `product with articlenumber ${httpRequest.params.articleNumber} was not found.`}) // if not, return 400
                }
        }
})
   
 


      
module.exports = controller