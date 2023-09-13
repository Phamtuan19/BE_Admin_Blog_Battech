
import express from "express";
import { create, getAll } from "../../controllers/post.controller";

const postRoute = express();

postRoute.post('/create', create);
postRoute.get('/', getAll);

export default postRoute;