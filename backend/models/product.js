import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."]
    },
    description: {
        type: String,
        required: [true, "Product price is required."]
    },
    price: {
        type: Number,
        required: [true, "Product description is required."]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required."]
    },
    images: [{ public_id: String, url: String }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export const Product = mongoose.model("Product", schema);