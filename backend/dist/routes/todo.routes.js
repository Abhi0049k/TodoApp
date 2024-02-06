"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_controllers_1 = require("../controllers/todo.controllers");
const express_1 = require("express");
const todoRouter = (0, express_1.Router)();
todoRouter.get("/", todo_controllers_1.getTodo);
todoRouter.post("/", todo_controllers_1.createTodo);
todoRouter.patch("/:id", todo_controllers_1.updateTodo);
todoRouter.delete("/:id", todo_controllers_1.deleteTodo);
exports.default = todoRouter;
