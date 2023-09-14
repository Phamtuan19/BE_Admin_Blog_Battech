
import express from "express";
import { create, deleteTopic, getAll, getAllTopicsWithPostCounts, findOne, updateTopic } from "../../controllers/postTopic.controller";

const routeTopic = express();

routeTopic.post('/create', create);

routeTopic.get('/', getAll);

routeTopic.get('/all', getAllTopicsWithPostCounts);

routeTopic.get('/:id', findOne);

routeTopic.put('/:id', updateTopic)

routeTopic.delete('/:id', deleteTopic)

export default routeTopic;