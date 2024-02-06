"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const validations_1 = require("../validations/validations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const JWT_SECRET_KEY = (_a = process.env.JWT_PASSWORD) !== null && _a !== void 0 ? _a : "";
    const { email, password } = req.body;
    try {
        const check = (0, validations_1.validatingUserCredentials)({ email, password });
        if (!check.success)
            return next({ status: 422, message: "Invalid Input" });
        const userDetails = yield prismaInstance_1.default.user.findUnique({ where: { email } });
        if (!userDetails)
            return next({ status: 404, message: "User Doesn't Exist" });
        const result = yield bcrypt_1.default.compare(password, userDetails.password);
        if (!result)
            return next({ status: 422, message: "Wrong Password" });
        const token = jsonwebtoken_1.default.sign({ email: userDetails.email }, JWT_SECRET_KEY);
        res.status(200).send({ message: "Login Successful", token });
    }
    catch (err) {
        next(err);
    }
});
exports.signin = signin;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    try {
        const check = (0, validations_1.validatingUserCredentials)({ email, password });
        if (!check.success)
            return next({ status: 422, message: "Invalid Input" });
        const userExists = yield prismaInstance_1.default.user.findUnique({ where: { email } });
        if (userExists)
            return next({ status: 409, message: "User Already Exists" });
        password = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        const newUser = yield prismaInstance_1.default.user.create({ data: { email, password }, select: { email: true, id: true } });
        res.status(200).send({ newUser });
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
