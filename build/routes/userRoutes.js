"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/").post(user_1.registerUser).get(authMiddleware_1.protect, authMiddleware_1.admin, user_1.getUsers);
router.route("/login").post(user_1.authUser);
router
    .route("/profile")
    .get(authMiddleware_1.protect, user_1.getUserProfile)
    .put(authMiddleware_1.protect, user_1.updateUserProfile);
router
    .route("/:id")
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, user_1.deleteUser)
    .get(authMiddleware_1.protect, authMiddleware_1.admin, user_1.getUserById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, user_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map