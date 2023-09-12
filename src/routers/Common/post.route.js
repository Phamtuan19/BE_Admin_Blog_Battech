
import express from "express";
import { create } from "../../controllers/post.controller";

const postRoute = express();

postRoute.post('/create', create);

export default postRoute;