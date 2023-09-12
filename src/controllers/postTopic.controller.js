import { responseSuccess } from "../helpers/response";
import PostTopic from "../models/postTopic";

// [POST] /posts/topic/create
export const create = async (req, res, next) => {
    try {
        const data = req.body;
        const postTopic = await new PostTopic(data).save();
        return res.json({ message: "success", data: postTopic });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

// [POST] /posts/topic
export const getAll = async (req, res, next) => {
    try {
        const topics = await PostTopic.find({});
        return res.json({ message: "success", data: topics });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};