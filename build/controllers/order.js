"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.getMyOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models/");
const addOrderItems = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
        return;
    }
    else {
        const order = new models_1.Order({
            orderItems,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});
exports.addOrderItems = addOrderItems;
const getOrderById = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await models_1.Order.findById(req.params.id).populate("user", "name email");
    if (order) {
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});
exports.getOrderById = getOrderById;
const updateOrderToPaid = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await models_1.Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const updateOrderToDelivered = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await models_1.Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});
exports.updateOrderToDelivered = updateOrderToDelivered;
const getMyOrders = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.user)
        throw new Error("User Not Found");
    const orders = await models_1.Order.find({ user: req.user._id });
    if (orders) {
        res.json(orders);
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});
exports.getMyOrders = getMyOrders;
const getOrders = (0, express_async_handler_1.default)(async (_req, res) => {
    const orders = await models_1.Order.find({}).populate("user", "id name");
    if (orders) {
        res.json(orders);
    }
    else {
        res.status(404);
        throw new Error("Orders not found");
    }
});
exports.getOrders = getOrders;
//# sourceMappingURL=order.js.map