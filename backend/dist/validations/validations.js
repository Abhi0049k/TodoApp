"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationTaskCredentials = exports.validatingUserCredentials = void 0;
const zod_1 = __importDefault(require("zod"));
const validatingUserCredentials = (obj) => {
    const schema = zod_1.default.object({
        email: zod_1.default.string().email(),
        password: zod_1.default.string().min(8)
    });
    const response = schema.safeParse(obj);
    return response;
};
exports.validatingUserCredentials = validatingUserCredentials;
const validationTaskCredentials = (obj) => {
    const schema = zod_1.default.object({
        task: zod_1.default.string()
    });
    const response = schema.safeParse(obj);
    return response;
};
exports.validationTaskCredentials = validationTaskCredentials;
