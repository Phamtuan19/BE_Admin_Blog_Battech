
import express from "express";
import { create, getAll } from "../../controllers/postTopic.controller";

const routeTopic = express();

routeTopic.post('/create', create);
routeTopic.get('/', getAll);

export default routeTopic;