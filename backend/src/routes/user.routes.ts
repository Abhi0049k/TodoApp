import { Router } from "express"
import { signin, signup } from "../controllers/user.controllers";

const userRouter: Router = Router();

userRouter.post("/signin", signin)

userRouter.post("/signup", signup)

export default userRouter