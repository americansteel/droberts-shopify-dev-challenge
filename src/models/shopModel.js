import mongoose from 'mongoose';

const Schema =  mongoose.Schema;

export const ProductSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    price: {
        type: Number,
        required: 'Enter a price'
    },
    inventory_count: {
        type: Number,
        required: 'Enter an inventory count',
        min: 0
    }
});
