
import express from "express";
import { create, getAll, deletePost, findOne, update } from "../../controllers/post.controller";
import checkAuthSessionMiddleware from "../../middlewares/checkAuthSeesion.middleware";

const postRoute = express();

postRoute.post('/create', create);

postRoute.get('/', getAll);

postRoute.delete('/:id', deletePost);

postRoute.get('/:id', findOne);

postRoute.put('/:id', update);

export default postRoute;