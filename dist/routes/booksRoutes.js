"use strict";
exports.__esModule = true;
var express_1 = require("express");
var booksServices_1 = require("../services/booksServices");
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    var data = (0, booksServices_1.getBooks)();
    res.send(data);
});
router.post("/", function (req, res) {
    var data = (0, booksServices_1.createBook)(req.body);
    res.status(201).json({
        data: data
    });
});
router.get("/:id", booksServices_1.getBook);
exports["default"] = router;
