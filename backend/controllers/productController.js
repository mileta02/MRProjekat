import { asyncErrorCatcher } from "../middlewares/errorMiddleware.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

export const getAllProducts = asyncErrorCatcher(async (req, res, next) => {
    const { keyword, category } = req.query || {};

    const filter = {};
    if (keyword) {
        filter.name = {
            $regex: keyword,
            $options: "i"
        };
    }
    if (category) {
        filter.category = category;
    }

    const products = await Product.find(filter);

    res.status(200).json({
        success: true,
        products
    });
});

export const getProduct = asyncErrorCatcher(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product with this id doesn't exist.", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

export const createProduct = asyncErrorCatcher(async (req, res, next) => {
    const { name, description, category, price, stock } = req.body || {};

    if (!req.file) {
        return next(new ErrorHandler("Please enter image.", 400));
    }
    const file = getDataUri(req.file);
    const uploadResult = await cloudinary.v2.uploader.upload(file.content);
    const image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url
    }

    await Product.create({
        name,
        description,
        category,
        price,
        stock,
        images: [image]
    });
    res.status(200).json({
        success: true,
        message: "Product created successfully."
    });
});

export const updateProduct = asyncErrorCatcher(async (req, res, next) => {
    const { name, description, category, price, stock } = req.body || {};

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product with this id doesn't exist.", 404));
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (stock) product.stock = stock;

    await product.save();

    res.status(200).json({
        success: true,
        message: "Product updated successfully."
    });
});

export const deleteProduct = asyncErrorCatcher(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product with this id doesn't exist.", 404));
    }
    for (let index = 0; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }
    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    });
});

export const addProductImage = asyncErrorCatcher(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product with this id doesn't exist.", 404));
    }

    if (!req.file) {
        return next(new ErrorHandler("Please enter image.", 400));
    }

    const file = getDataUri(req.file);
    const uploadResult = await cloudinary.v2.uploader.upload(file.content);
    const image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url
    };

    product.images.push(image);
    await product.save();

    res.status(200).json({
        success: true,
        message: "Product image added successfully."
    });
});

export const deleteProductImage = asyncErrorCatcher(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product with this id doesn't exist.", 404));
    }
    const id = req.query.id;

    if (!id) {
        return next(new ErrorHandler("Please enter image id.", 400));
    }

    let doesExist = -1;

    product.images.forEach((item, index) => {
        if (item._id.toString() === id.toString()) doesExist = index;
    });
    if (doesExist < 0) {
        return next(new ErrorHandler("Product image doesn't exist.", 400));
    }

    await cloudinary.v2.uploader.destroy(product.images[doesExist].public_id);
    product.images.splice(doesExist, 1);

    await product.save();

    res.status(200).json({
        success: true,
        message: "Product image deleted successfully. TEST"
    });
});