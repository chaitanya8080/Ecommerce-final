
const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = 
require("../controllers/productController");


const { isAuthenticatedUser, authorizeRole } = require("../middleware/Auth");

const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,authorizeRole("admin"),createProduct);

router.route("/product/:id").put(isAuthenticatedUser,authorizeRole("admin"),updateProduct);

router.route("/product/:id").delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router;