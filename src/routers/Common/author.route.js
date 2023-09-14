
import express from "express";
import { create, getAll, deleteAuthor, findById, updateAuthor } from "../../controllers/author.controller";

const authorRoute = express();

authorRoute.post('/create', create);

authorRoute.get('/', getAll);

authorRoute.get('/:id', findById);

authorRoute.put('/:id', updateAuthor)

authorRoute.delete('/:id', deleteAuthor)

export default authorRoute;