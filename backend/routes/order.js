import express from "express";

import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getOrders,
  getMonthlyIncome,
} from "../controllers/order";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken";

const router = express.Router();

// POST => /api/orders
router.post("/", verifyToken, createOrder);

// PATCH => /api/orders/:id
router.patch("/:id", verifyTokenAndAdmin, updateOrder);

// DELETE => /api/orders/:id
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// GET => /api/orders/:userId
router.get("/:userId", verifyTokenAndAuthorization, getUserOrders);

// GET => /api/orders
router.get("/", verifyTokenAndAdmin, getOrders);

// GET => /api/orders/stats
router.get("/stats", verifyTokenAndAdmin, getMonthlyIncome);

export default router;
