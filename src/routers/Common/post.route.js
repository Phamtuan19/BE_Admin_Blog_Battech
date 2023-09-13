
import express from "express";
import { create, getAll } from "../../controllers/post.controller";
import checkAuthSessionMiddleware from "../../middlewares/checkAuthSeesion.middleware";

const postRoute = express();

postRoute.post('/create', checkAuthSessionMiddleware, create);
postRoute.get('/', getAll);

export default postRoute;