
import TagSchema from '../models/tag'

export const create = async (req, res, next) => {
    try {
        const body = req.body;
        const tag = await TagSchema(body).save();
        return res.json({ message: "success", data: tag });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

// [POST] 
export const getAll = async (req, res, next) => {
    try {
        const tags = await TagSchema.find({});
        return res.json({ message: "success", data: tags });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};