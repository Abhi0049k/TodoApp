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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = void 0;
const validations_1 = require("../validations/validations");
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const getTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const tasklist = yield prismaInstance_1.default.todo.findMany({ where: { email } });
        res.status(200).send(tasklist);
    }
    catch (err) {
        next(err);
    }
});
exports.getTodo = getTodo;
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, email } = req.body;
    if (!task)
        return next({ message: "Task not found", status: 404 });
    try {
        const check = (0, validations_1.validationTaskCredentials)({ task });
        if (!check.success)
            return next({ status: 422, message: "Invalid Input" });
        const newTodo = yield prismaInstance_1.default.todo.create({ data: { task, email } });
        res.status(201).send({ message: "New Todo Added" });
    }
    catch (err) {
        next(err);
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email } = req.body;
    try {
        yield prismaInstance_1.default.todo.update({ where: { id, email }, data: { status: true } });
        res.status(200).send({ message: "Task Updated" });
    }
    catch (err) {
        next(err);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const taskItem = yield prismaInstance_1.default.todo.findFirst({ where: { email, id } });
        if (!taskItem)
            return next({ message: "You are not authorized", status: 403 });
        yield prismaInstance_1.default.todo.delete({ where: { id } });
        res.status(200).send({ message: "Task Deleted" });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTodo = deleteTodo;
