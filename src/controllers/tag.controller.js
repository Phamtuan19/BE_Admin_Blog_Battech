
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

// [GET] 
export const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const category = req.query.category || "";
        const sortBy = req.query.sortBy || "asc";
        const perPage = limit * page - limit;

        let sortDirection = 1; // Mặc định là sắp xếp tăng dần

        if (sortBy === 'desc') {
            sortDirection = -1; // Sắp xếp giảm dần
        }

        const tags = await TagSchema.find({
            // [category]: { $regex: search, $options: "i" },
        })
            // .sort({ [category]: sortDirection }) // Sử dụng object để xác định trường sắp xếp và hướng sắp xếp
            .skip(perPage)
            .limit(limit);

        const total = await TagSchema.countDocuments({
            // [category]: { $regex: search, $options: "i" },
        });

        const totalPage = Math.ceil(total / limit);
        return res.status(200).json({
            message: 'success',
            data: {
                data: tags,
                total,
                totalPage,
                currentPage: page,
            }
        });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

export const deleteTag = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tag = await TagSchema.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Success", tag });
    } catch (error) {
        res.status(400).json({ message: "Xóa không thành công", error });
    }
}
