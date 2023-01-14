"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("../models/users");
var password_validator_1 = __importDefault(require("password-validator"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = (0, express_1.Router)();
var users = new users_1.Users();
var validator = new password_validator_1["default"]();
validator.is().min(8).has().uppercase().has().lowercase().has().digits();
// Register
// ROUTE: /users/register
router.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, hashedPassword, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                body = req.body;
                if (!body.firstname || !body.lastname || !body.username || !body.password) {
                    res.status(400).send("Invalid input");
                    return [2 /*return*/];
                }
                // Check that passwords matches the requirements
                if (!validator.validate(body.password)) {
                    res.status(400).send("Please enter a secure password");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users.getUserByUsername(body.username)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(400).send("Username already taken");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(body.password, Number(process.env.SALT))];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, users.createUser({
                        firstname: body.firstname,
                        lastname: body.lastname,
                        username: body.username,
                        password: hashedPassword
                    })];
            case 3:
                //   Add the new user to the DB
                user = _a.sent();
                token = jsonwebtoken_1["default"].sign({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    id: user.id,
                    username: user.username
                }, String(process.env.JWT_SECRET));
                res.send(token);
                return [2 /*return*/];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Login
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, compare, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                body = req.body;
                if (!body.username || !body.password) {
                    res.status(400).send("Invalid input");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users.getUserByUsername(body.username)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(400).send("Invalid login details");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(body.password, user.password)];
            case 2:
                compare = _a.sent();
                if (!compare) {
                    res.status(400).send("Invalid login details");
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1["default"].sign({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    id: user.id,
                    username: user.username
                }, String(process.env.JWT_SECRET));
                res.json({
                    token: token,
                    user: __assign({}, user)
                });
                return [2 /*return*/];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
