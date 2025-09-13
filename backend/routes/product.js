import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
import { addProductImage, createProduct, deleteProduct, deleteProductImage, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";
import { createCategory, deleteCategory, getAllCategories } from "../controllers/categotyController.js";

const router = express.Router();

//Category routes
router.get("/categories", getAllCategories);
router.post("/category", isAuthenticated, isAdmin, createCategory);
router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory);

router.get("/all", getAllProducts);
router.route("/:id")
        .get(getProduct)
        .put(isAuthenticated, isAdmin, updateProduct)
        .delete(isAuthenticated, isAdmin, deleteProduct);
router.post("/new", isAuthenticated, isAdmin, uploadSingle, createProduct);
router.route("/images/:id")
        .post(isAuthenticated, isAdmin, uploadSingle, addProductImage)
        .delete(isAuthenticated, isAdmin, deleteProductImage);

export default router;