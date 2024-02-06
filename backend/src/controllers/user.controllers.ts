import { validatingUserCredentials } from "../validations/validations";
import { userCredentialsI } from "../shared/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../configs/prismaInstance";
import { Request, Response, NextFunction } from "express";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET_KEY: string = process.env.JWT_PASSWORD ?? "";
    const { email, password }: userCredentialsI = req.body;
    try {
        const check = validatingUserCredentials({ email, password });
        if (!check.success) return next({ status: 422, message: "Invalid Input" });
        const userDetails = await prisma.user.findUnique({ where: { email } });
        if (!userDetails) return next({ status: 404, message: "User Doesn't Exist" });
        const result = await bcrypt.compare(password, userDetails.password);
        if (!result) return next({ status: 422, message: "Wrong Password" });
        const token: string = jwt.sign({ email: userDetails.email }, JWT_SECRET_KEY);
        res.status(200).send({ message: "Login Successful", token });
    } catch (err) {
        next(err);
    }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password }: userCredentialsI = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
    try {
        const check = validatingUserCredentials({ email, password });
        if (!check.success) return next({ status: 422, message: "Invalid Input" });
        const userExists = await prisma.user.findUnique({ where: { email } })
        if (userExists) return next({ status: 409, message: "User Already Exists" });
        password = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await prisma.user.create({ data: { email, password }, select: { email: true, id: true } })
        res.status(200).send({ newUser });
    } catch (err) {
        next(err);
    }
}