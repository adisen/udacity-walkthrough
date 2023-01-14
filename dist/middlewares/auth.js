"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        var decoded = jsonwebtoken_1["default"].verify(String(token), String(process.env.JWT_TOKEN));
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports["default"] = verifyToken;
