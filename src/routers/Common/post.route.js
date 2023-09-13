
import express from "express";
import { create, getAll, deletePost } from "../../controllers/post.controller";
import checkAuthSessionMiddleware from "../../middlewares/checkAuthSeesion.middleware";

const postRoute = express();

postRoute.post('/create', checkAuthSessionMiddleware, create);
postRoute.delete('/update', checkAuthSessionMiddleware, deletePost);
postRoute.get('/', getAll);

export default postRoute;