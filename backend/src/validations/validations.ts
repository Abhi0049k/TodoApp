import { userCredentialsI } from "../shared/types";
import zod from "zod";

export const validatingUserCredentials = (obj: userCredentialsI) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const response = schema.safeParse(obj);
    return response
}

export const validationTaskCredentials = (obj: { task: string }) => {
    const schema = zod.object({
        task: zod.string()
    })
    const response = schema.safeParse(obj);
    return response
}