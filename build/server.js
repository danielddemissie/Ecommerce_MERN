"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const order_1 = __importDefault(require("./routes/order"));
const upload_1 = __importDefault(require("./routes/upload"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
dotenv_1.default.config();
(0, db_1.default)();
app.get("/", (_req, res) => {
    res.send("API IS RUNNING...");
});
app.use("/api/products/", product_1.default);
app.use("/api/users/", user_1.default);
app.use("/api/orders/", order_1.default);
app.use("/api/upload", upload_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "/uploads")));
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running in ${config_1.nodeEnv} mode on port ${PORT}`);
});
//# sourceMappingURL=server.js.map