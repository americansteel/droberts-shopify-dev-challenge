import mongoose from 'mongoose';
import { ProductSchema } from '../models/shopModel';

const Product = mongoose.model('Product', ProductSchema);

//add new product, req. product object
export const addNewProduct = (req, res) => {
    let newProduct = new Product(req.body);
    newProduct.save((err, product ) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
};

//get all products
export const getProducts = (req, res) => {
    Product.find({}, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.json(product)
    })
}

//get all products with inventory of 1 or more
export const getAvailableProducts = (req, res) => {
    Product.find({ inventory_count: { $gt: 0 } }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    })
}

//update product info, req. product object
export const updateProduct = (req, res) => {
    Product.findOneAndUpdate({ title: req.params.title }, req.body, { new: true, runValidators: true }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    })
}

//purchase product, req. id in the URL
export const purchaseProduct = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productId, inventory_count: {$gte: 1 }  }, { $inc: {inventory_count: -1} }, { new: true, runValidators: true, useFindandModify: false   }, (err, newProduct) => {
        if (err) {
            res.send(err)
        }
        res.json(newProduct)
    })
}


