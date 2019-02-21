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

        //get products with inventory above 1
    app.route('/products/available')
        .get(getAvailableProducts);
        
        //purchase products
    app.route('/products/purchase/:productId')
        .post(purchaseProduct);
}

export default routes;