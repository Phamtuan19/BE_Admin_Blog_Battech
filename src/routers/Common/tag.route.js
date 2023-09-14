
import express from "express";
import { create, getAll, deleteTag } from "../../controllers/tag.controller";

const tagRoute = express();

tagRoute.post('/create', create);

tagRoute.get('/', getAll);

tagRoute.delete('/:id', deleteTag);

export default tagRoute;