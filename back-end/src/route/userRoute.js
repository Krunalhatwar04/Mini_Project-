import express from "express";
import { getusers, loginUser, updateUser, userAdd } from "../controller/userController.js";

const userRouter=express.Router();

// userRouter.get('/',fetchStudent);
// userRouter.post('/',userAdd);
// userRouter.post('/',loginUser)
// userRouter.get('/',getusers)
// userRouter.put('/:id',updateUser)


userRouter.get('/', getusers);
userRouter.post('/signup', userAdd);
userRouter.post('/login', loginUser);
userRouter.put('/:id', updateUser);
export default userRouter;