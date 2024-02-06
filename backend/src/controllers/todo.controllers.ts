import { validationTaskCredentials } from "../validations/validations";
import prisma from "../configs/prismaInstance";
import { NextFunction, Request, Response } from "express";

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const tasklist = await prisma.todo.findMany({ where: { email } });
        res.status(200).send(tasklist);
    } catch (err) {
        next(err)
    }
}

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { task, email } = req.body;
    if (!task) return next({ message: "Task not found", status: 404 })
    try {
        const check = validationTaskCredentials({ task });
        if (!check.success) return next({ status: 422, message: "Invalid Input" });
        const newTodo = await prisma.todo.create({ data: { task, email } });
        res.status(201).send({ message: "New Todo Added" });
    } catch (err) {
        next(err);
    }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        await prisma.todo.update({ where: { id, email }, data: { status: true } });
        res.status(200).send({ message: "Task Updated" });
    } catch (err) {
        next(err);
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const taskItem = await prisma.todo.findFirst({ where: { email, id } });
        if (!taskItem) return next({ message: "You are not authorized", status: 403 })
        await prisma.todo.delete({ where: { id } });
        res.status(200).send({ message: "Task Deleted" });
    } catch (err) {
        next(err);
    }
}