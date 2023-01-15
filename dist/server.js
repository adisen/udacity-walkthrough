"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(express_1["default"].json());
// Endpoints
app.use("/books", booksRoutes_1["default"]);
// app.use("/auth");
app.get("/", function (req, res) {
    res.json({
        error: "You are not authorized"
    });
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
