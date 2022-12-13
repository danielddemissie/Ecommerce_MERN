"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopProducts = exports.createProductReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models/");
const getProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
    const count = await models_1.Product.countDocuments(Object.assign({}, keyword));
    const products = await models_1.Product.find(Object.assign({}, keyword))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
exports.getProducts = getProducts;
const getProductById = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await models_1.Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
exports.getProductById = getProductById;
const deleteProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await models_1.Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
exports.deleteProduct = deleteProduct;
const createProduct = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const product = new models_1.Product({
        name: "Sample Name",
        price: 0,
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        image: "/images/sample.jpg",
        brand: "Sample Brand",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
        description: "Same Description",
    });
    const createdProduct = await product.save();
    console.log(createdProduct);
    res.status(201).json(product);
});
exports.createProduct = createProduct;
const updateProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { name, price, image, description, brand, category, countInStock } = req.body;
    const product = await models_1.Product.findById(id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error("Product not found.");
    }
});
exports.updateProduct = updateProduct;
const createProductReview = (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b;
    const { id } = req.params;
    const { rating, comment } = req.body;
    const product = await models_1.Product.findById(id);
    if (product) {
        const alreadyReviewed = product.reviews.find((review) => { var _a; return review.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }
        const review = {
            name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.name,
            rating: Number(rating),
            comment,
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review added" });
    }
    else {
        res.status(404);
        throw new Error("Product not found.");
    }
});
exports.createProductReview = createProductReview;
const getTopProducts = (0, express_async_handler_1.default)(async (_req, res) => {
    const products = await models_1.Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
});
exports.getTopProducts = getTopProducts;
//# sourceMappingURL=product.js.map