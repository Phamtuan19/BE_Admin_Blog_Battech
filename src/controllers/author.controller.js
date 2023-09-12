import AuhtorSchema from '../models/author'

export const create = async (req, res, next) => {
    try {
        const body = req.body;
        const author = await AuhtorSchema(body).save();
        return res.json({ message: "success", data: author });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};


// [POST] 
export const getAll = async (req, res, next) => {
    try {
        const authors = await AuhtorSchema.find({});
        return res.json({ message: "success", data: authors });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};