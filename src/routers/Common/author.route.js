
import express from "express";
import { create, getAll, deleteAuthor, findById, updateAuthor, getAllAuthor } from "../../controllers/author.controller";

const authorRoute = express();

authorRoute.post('/create', create);

authorRoute.post('/allAuthor', getAllAuthor);

authorRoute.get('/', getAll);

authorRoute.get('/:id', findById);

authorRoute.put('/:id', updateAuthor)

authorRoute.delete('/:id', deleteAuthor)

export default authorRoute;