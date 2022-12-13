"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/").get(product_1.getProducts).post(authMiddleware_1.protect, authMiddleware_1.admin, product_1.createProduct);
router.route("/:id/reviews").post(authMiddleware_1.protect, product_1.createProductReview);
router.get("/top", product_1.getTopProducts);
router
    .route("/:id")
    .get(product_1.getProductById)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, product_1.deleteProduct)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, product_1.updateProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map