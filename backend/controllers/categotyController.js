import { asyncErrorCatcher } from "../middlewares/errorMiddleware.js";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";


export const createCategory = asyncErrorCatcher(async (req, res, next) => {
    const { category } = req.body || {};

    await Category.create({
        category
    });

    res.status(201).json({
        success: true,
        message: "Category created successfully."
    });
});

export const getAllCategories = asyncErrorCatcher(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({
        success: true,
        categories
    });
});

export const deleteCategory = asyncErrorCatcher(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler("Category with this id doesn't exist.", 404));
    }

    const products = await Product.find({ category: category._id });

    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        product.category = undefined;
        await product.save();
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: "Category deleted successfully."
    });
});