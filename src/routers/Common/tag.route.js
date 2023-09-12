
import express from "express";
import { create, getAll } from "../../controllers/tag.controller";

const tagRoute = express();

tagRoute.post('/create', create);
tagRoute.get('/', getAll);

export default tagRoute;