"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization = (req, res, next) => {
    var _a, _b;
    const token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "";
    if (!token)
        return res.status(404).send({ message: "Token not found" });
    const JWT_SECRET_KEY = (_b = process.env.JWT_PASSWORD) !== null && _b !== void 0 ? _b : null;
    if (!JWT_SECRET_KEY)
        return res.status(500).send({ message: "Something went wrong!!!" });
    try {
        const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        if (typeof decode !== "string")
            req.body.email = decode.email;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong!!!" });
    }
};
exports.default = authorization;
