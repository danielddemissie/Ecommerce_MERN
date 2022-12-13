"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders = [
    {
        user: "abc123",
        orderItems: [],
        shippingAddress: {
            address: "test",
            city: "test",
            country: "test",
            postalCode: "123456",
        },
        paymentMethod: "paypal",
        itemsPrice: 1000,
        taxPrice: 10,
        shippingPrice: 0,
        totalPrice: 1010,
        isPaid: true,
        paidAt: 1,
        isDelivered: true,
        deliveredAt: 2,
    },
    {
        user: "abc1234",
        orderItems: [],
        shippingAddress: {
            address: "test",
            city: "test",
            country: "test",
            postalCode: "123456",
        },
        paymentMethod: "square",
        itemsPrice: 100,
        taxPrice: 5,
        shippingPrice: 0,
        totalPrice: 105,
        isPaid: true,
        paidAt: 1,
        isDelivered: true,
        deliveredAt: 2,
    },
    {
        user: "abc123456",
        orderItems: [],
        shippingAddress: {
            address: "test",
            city: "test",
            country: "test",
            postalCode: "123456",
        },
        paymentMethod: "paypal",
        itemsPrice: 5000,
        taxPrice: 100,
        shippingPrice: 0,
        totalPrice: 5100,
        isPaid: true,
        paidAt: 1,
        isDelivered: true,
        deliveredAt: 2,
    },
];
exports.default = orders;
//# sourceMappingURL=orders.js.map