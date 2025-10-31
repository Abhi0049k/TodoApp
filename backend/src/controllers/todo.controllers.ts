import { validationTaskCredentials } from "../validations/validations";
import prisma from "../configs/prismaInstance";
import { NextFunction, Request, Response } from "express";
import { TodoInput } from "shared/types";

// export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email } = req.body;
//         const tasklist = await prisma.todo.findMany({ where: { email } });
//         res.status(200).send(tasklist);
//     } catch (err) {
//         next(err)
//     }
// }

// export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
//     const { task, email } = req.body;
//     if (!task) return next({ message: "Task not found", status: 404 })
//     try {
//         const check = validationTaskCredentials({ task });
//         if (!check.success) return next({ status: 422, message: "Invalid Input" });
//         const newTodo = await prisma.todo.create({ data: { task, email } });
//         res.status(201).send({ message: "New Todo Added" });
//     } catch (err) {
//         next(err);
//     }
// }

// export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const { email } = req.body;
//     try {
//         await prisma.todo.update({ where: { id, email }, data: { status: true } });
//         res.status(200).send({ message: "Task Updated" });
//     } catch (err) {
//         next(err);
//     }
// }

// export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const { email } = req.body;
//     try {
//         const taskItem = await prisma.todo.findFirst({ where: { email, id } });
//         if (!taskItem) return next({ message: "You are not authorized", status: 403 })
//         await prisma.todo.delete({ where: { id } });
//         res.status(200).send({ message: "Task Deleted" });
//     } catch (err) {
//         next(err);
//     }
// }

// const editTodo = async(req: Request, res: Response, next: NextFunction) => {
//     const {id} = req.params;
//     const {task, email} = req.body;

//     if(!task) return next ({message : "Task content cannot be empty", status:422});

//     try {
        
//         const check = validationTaskCredentials({task});
//         if(!check.success) return next({message:"Invalid input", status:422});

//         const existingTask = await prisma.todo.findFirst({where: {id, email}});
//         if(!existingTask) return next({message:"You are not authorised", status:403});

//         await prisma.todo.update({where:{id}, data:{task}});
//         res.status(200).send({message:"Task edited successfully"});
//     } catch (error) {
//         next(error);
//     }
// }




export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email }: TodoInput = req.body;
        const tasklist = await prisma.todo.findMany({
            where: { email },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(tasklist);
    } catch (err) {
        next(err);
    }
};

// Create a new todo
// export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
//     const { task, description, email } = req.body;

//     if (!task) return next({ message: "Task is required", status: 422 });

//     try {
//         const check = validationTaskCredentials({ task, description});
//         if (!check.success) return next({ status: 422, message: "Invalid Input" });

//         const newTodo = await prisma.todo.create({
//             data: {
//                 task,
//                 description: description ?? "",
//                 email,
//             },
//         });

//         res.status(201).json({ message: "New Todo Added", todo: newTodo });
//     } catch (err) {
//         next(err);
//     }
// };


// Edit todo (task/description)
export const editTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { task, description, email } = req.body as TodoInput;

    try {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo || todo.email !== email) return next({ message: "Not authorized", status: 403 });

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                task: task ?? todo.task,
                description: description ?? todo.description,
            },
        });

        res.status(200).json({ message: "Todo Updated", todo: updatedTodo });
    } catch (err) {
        next(err);
    }
};

// Toggle status
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id, email } = req.body;

    try {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo || todo.email !== email) return next({ message: "Not authorized", status: 403 });

        const updated = await prisma.todo.update({
            where: { id },
            data: { status: !todo.status },
        });

        res.status(200).json({ message: "Todo status toggled", todo: updated });
    } catch (err) {
        next(err);
    }
};

// Delete todo
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id, email } = req.body;

    try {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo || todo.email !== email) return next({ message: "Not authorized", status: 403 });

        await prisma.todo.delete({ where: { id } });
        res.status(200).json({ message: "Todo Deleted" });
    } catch (err) {
        next(err);
    }
};