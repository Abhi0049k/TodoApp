"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const userRouter = (0, express_1.Router)();
userRouter.post("/signin", user_controllers_1.signin);
userRouter.post("/signup", user_controllers_1.signup);
exports.default = userRouter;
