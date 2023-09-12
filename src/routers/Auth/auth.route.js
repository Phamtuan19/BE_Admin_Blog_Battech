import express from "express";
import { getAll, getUser, postLogout, register } from "../../controllers/user.controller";
import checkAuthSessionMiddleware from "../../middlewares/checkAuthSeesion.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

const authRoute = express();

authRoute.get('/', getAll);
authRoute.get('/register', register);
authRoute.post('/login', authMiddleware);
authRoute.get('/getUser', checkAuthSessionMiddleware, getUser)
authRoute.post('/logout', checkAuthSessionMiddleware, postLogout)

export default authRoute