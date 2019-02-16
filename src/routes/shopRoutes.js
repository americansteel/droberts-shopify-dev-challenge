import {
    addNewProduct,
    getProducts,
    getAvailableProducts,
    purchaseProduct
} from "../controllers/shopController";

const routes = (app) => {



    app.route('/products')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getProducts)

        //POST endpoint
        .post(addNewProduct);

    app.route('/products/available')
    .get(getAvailableProducts);

    app.route('/products/purchase/:productId')
    .post(purchaseProduct);

    //  app.route('/product/purchase/:title')
   // .put(updateProduct)
   
   
   
    // app.route('/contact/id/:contactId')
    //     //get specific contact 
    //      .get(getContactById)
    //     //put request
    //     .put(updateContact)
    //     //delete request
    //     .delete(deleteContact)

    // app.route('/contact/name/:firstName')
    //     .get(getContactByName);


}

export default routes;