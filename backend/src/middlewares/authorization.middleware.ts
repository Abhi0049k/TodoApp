import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authorization = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization ?? "";
    if (!token) return res.status(404).send({ message: "Token not found" });
    const JWT_SECRET_KEY: string | null = process.env.JWT_PASSWORD ?? null;
    if (!JWT_SECRET_KEY) return res.status(500).send({ message: "Something went wrong!!!" });
    try {
        const decode: JwtPayload | string = jwt.verify(token, JWT_SECRET_KEY);
        if (typeof decode !== "string")
            req.body.email = decode.email;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong!!!" });
    }
}

export default authorization