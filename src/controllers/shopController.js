import mongoose from 'mongoose';
import { ProductSchema } from '../models/shopModel';

const Product = mongoose.model('Product', ProductSchema);

export const addNewProduct = (req, res) => {
    let newProduct = new Product(req.body);
    newProduct.save((err, product ) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
};

export const getProducts = (req, res) => {
    Product.find({}, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.json(product)
    })
}
export const getAvailableProducts = (req, res) => {
    Product.find({ inventory_count: { $gt: 0 } }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    })
}

export const updateProduct = (req, res) => {
    Product.findOneAndUpdate({ title: req.params.title }, req.body, { new: true, runValidators: true }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    })
}

export const purchaseProduct = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productId, inventory_count: {$gte: 1 }  }, { $inc: {inventory_count: -1} }, { new: true, runValidators: true, useFindandModify: false   }, (err, newProduct) => {
        if (err) {
            res.send(err)
        }
        res.json(newProduct)
    })
}


// export const getContactByName = (req, res) => {
//     Contact.find({firstName: req.params.firstName}, (err, contact) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(contact);
//     })

// }

// export const updateContact = (req, res) => {
//     Contact.findOneAndUpdate({ _id: req.params.contactId}, req.body, { new: true}, (err, contact) => {
//         if (err) {
//             res.send(err)
//         }
//         res.json(contact);
//     } )
// }

// export const deleteContact = (req, res) => {
//     Contact.remove({ _id: req.params.contactId}, (err, contact) => {
//         if (err) {
//             res.send(err)
//         }
//         res.json( {message: 'Successfully deleted contact'});
//     })
// }
