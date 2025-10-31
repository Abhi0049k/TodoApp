import { userCredentialsI } from "../shared/types";
import zod from "zod";

export const validatingUserCredentials = (obj: userCredentialsI) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const response = schema.safeParse(obj);
    if(!response.success){
        return {success: false, message: response.error.issues[0]['message'], path: response.error.issues[0]['path']};
        // console.log("Validation result:", response.error.issues[0]['message'], response.error.issues[0]['path']);
    }else {
        return response
    }
}

export const validationTaskCredentials = (obj: { task: string; description?: string }) => {
    const schema = zod.object({
        task: zod.string(),
        description: zod.string().optional(),
    })
    const response = schema.safeParse(obj);
    return response
}