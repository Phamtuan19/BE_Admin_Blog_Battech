import AuthorSchema from '../models/author'

export const create = async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const author = await AuthorSchema({ name: body.name }).save();
        return res.json({ message: "success", data: author });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

export const findById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const author = await AuthorSchema.findById({ _id: id });
        return res.status(200).json({ message: "Success", data: author });
    } catch (error) {
        return res.status(400).json({ message: "Đã có lỗi xảy ra.", error });
    }
}


// [POST] 
export const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const category = req.query.category || "name";
        const sortBy = req.query.sortBy || "asc";
        const perPage = limit * page - limit;

        let sortDirection = 1; // Mặc định là sắp xếp tăng dần

        if (sortBy === 'desc') {
            sortDirection = -1; // Sắp xếp giảm dần
        }

        const authors = await AuthorSchema.find({
            [category]: { $regex: search, $options: "i" }
        }).sort({ [category]: sortDirection || 1 }) // Sử dụng object để xác định trường sắp xếp và hướng sắp xếp
            .skip(perPage)
            .limit(limit);

        const total = await AuthorSchema.countDocuments({
            [category]: { $regex: search, $options: "i" },
        });

        const totalPage = Math.ceil(total / limit);

        return res.json({
            message: "success",
            data: {
                data: authors,
                total,
                totalPage,
                currentPage: page,
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

export const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id;
        const author = await AuthorSchema.findByIdAndDelete({ _id: id });

        res.status(200).json({ message: "Success", author });
    } catch (error) {
        res.status(400).json({ message: "Xóa không thành công", error });
    }
}

export const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const author = await AuthorSchema.findByIdAndUpdate({ _id: id }, body, {
            new: true,
        });

        res.status(200).json({ message: "Success", data: author });
    } catch (error) {
        return res.status(400).json({ message: "Update thất bại. Đã có lỗi xảy ra.", error });
    }
}
