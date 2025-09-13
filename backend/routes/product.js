import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
import { addProductImage, createProduct, deleteProduct, deleteProductImage, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.route("/:id")
        .get(getProduct)
        .put(isAuthenticated, updateProduct)
        .delete(isAuthenticated, deleteProduct);
router.post("/new", isAuthenticated, uploadSingle, createProduct);
router.route("/images/:id")
        .post(isAuthenticated, uploadSingle, addProductImage)
        .delete(isAuthenticated, deleteProductImage);

export default router;