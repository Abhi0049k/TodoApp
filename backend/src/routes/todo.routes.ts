import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.controllers";
import { Router } from "express";

const todoRouter: Router = Router();

todoRouter.get("/", getTodo)

todoRouter.post("/", createTodo)

todoRouter.patch("/:id", updateTodo)

todoRouter.delete("/:id", deleteTodo)

export default todoRouter