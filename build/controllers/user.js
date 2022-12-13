"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.registerUser = exports.getUserProfile = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models/");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const authUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await models_1.User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
exports.authUser = authUser;
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await models_1.User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await models_1.User.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
exports.registerUser = registerUser;
const getUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const user = await models_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const user = await models_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, generateToken_1.default)(updatedUser._id),
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.updateUserProfile = updateUserProfile;
const getUsers = (0, express_async_handler_1.default)(async (_req, res) => {
    const users = await models_1.User.find({});
    res.json(users);
});
exports.getUsers = getUsers;
const deleteUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await models_1.User.findById(id);
    if (user) {
        await user.remove();
        res.json({ message: "User removed" });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.deleteUser = deleteUser;
const getUserById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await models_1.User.findById(id).select("-password");
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.getUserById = getUserById;
const updateUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await models_1.User.findById(id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map