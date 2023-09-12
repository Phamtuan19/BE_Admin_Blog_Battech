
import express from "express";
import { create, getAll } from "../../controllers/author.controller";

const authorRoute = express();

authorRoute.post('/create', create);
authorRoute.get('/', getAll);

export default authorRoute;