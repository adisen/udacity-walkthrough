"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var token = req.headers["x-auth"];
    if (!token) {
        return res.status(400).json({
            message: "Unauthroized, please pass in a token"
        });
    }
    try {
        var decoded = jsonwebtoken_1["default"].verify(String(token), String(process.env.JWT_SECRET));
        req.user = decoded;
    }
    catch (error) {
        res.status(401).json({
            message: "Token invalid"
        });
    }
    return next();
};
exports["default"] = verifyToken;
