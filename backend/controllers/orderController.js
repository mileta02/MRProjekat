import { asyncErrorCatcher } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const createOrder = asyncErrorCatcher(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount
    } = req.body || {};

    await Order.create({
        user: req.user._id,
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount
    });

    for (let index = 0; index < orderItems.length; index++) {
        const product = await Product.findById(orderItems[index].product);
        product.stock -= orderItems[index].quantity;
        await product.save();
    }

    res.status(201).json({
        success: true,
        message: "Order created successfully."
    })


});

export const getMyOrders = asyncErrorCatcher(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        orders
    });
});

export const getOrderDetails = asyncErrorCatcher(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order with this id doesn't exist.", 404));
    }
    res.status(200).json({
        success: true,
        order
    });
});

export const getAdminOrders = asyncErrorCatcher(async (req, res, next) => {
    const orders = await Order.find();
    res.status(200).json({
        success: true,
        orders
    });
});

export const proccessOrder = asyncErrorCatcher(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order with this id doesn't exist.", 404));
    }

    if (order.orderStatus === "Preparing") {
        order.orderStatus = "Shipped";
    } else if (order.orderStatus === "Shipped") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date(Date.now());
    } else {
        return next(new ErrorHandler("Order is already delivered.", 400));
    }
    await order.save();
    res.status(200).json({
        success: true,
        message: "Order proccessed successfully."
    });
});