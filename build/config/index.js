"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeEnv = exports.stripeKey = exports.jwtSecrete = exports.mongoUrl = exports.port = void 0;
const joi_1 = __importDefault(require("joi"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const envSchema = joi_1.default.object({
    MONGO_URL: joi_1.default.string().required().description("MongoDb connection URL"),
    PORT: joi_1.default.string().required().description("PORT"),
    JWT_SECRET_KEY: joi_1.default.string().required().description("JWT secrete"),
    STRIPE_KEY: joi_1.default.string().required().description("Stripe secrete key"),
    NODE_ENV: joi_1.default.string()
        .allow("development", "test", "production")
        .default("development"),
})
    .unknown()
    .required();
const { error, value } = envSchema.validate(process.env);
if (error)
    throw new Error(`evn variables error ${error.message}`);
exports.port = value.PORT;
exports.mongoUrl = value.MONGO_URL;
exports.jwtSecrete = value.JWT_SECRET_KEY;
exports.stripeKey = value.STRIPE_KEY;
exports.nodeEnv = value.NODE_ENV;
//# sourceMappingURL=index.js.map