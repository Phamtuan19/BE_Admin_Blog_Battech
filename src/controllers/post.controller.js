import { cloudinary } from '../helpers/cloudinary';
import PostSchema from '../models/post'

export const create = async (req, res, next) => {
    try {
        const { image, ...rest } = req.body;
        console.log(1);
        const fileImage = await cloudinary.uploader.upload(image);

        console.log(fileImage);

        const body = { ...rest, image: fileImage.secure_url };

        const product = await new PostSchema(body).save();

        console.log(2);

        res.status(200).json({
            product,
            message: "thêm thành công",
        });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

export const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const category = req.query.category || "";
        const sortBy = req.query.sortBy || "asc";
        const perPage = limit * page - limit;

        console.log(req.query)

        let sortDirection = 1; // Mặc định là sắp xếp tăng dần

        if (sortBy === 'desc') {
            sortDirection = -1; // Sắp xếp giảm dần
        }

        const posts = await PostSchema.find({
            [category]: { $regex: search, $options: "i" },
        })
            .sort({ [category]: sortDirection }) // Sử dụng object để xác định trường sắp xếp và hướng sắp xếp
            .skip(perPage)
            .limit(limit);

        const total = await PostSchema.countDocuments({
            [category]: { $regex: search, $options: "i" },
        });

        const totalPage = Math.ceil(total / limit);

        return res.status(200).json({
            data: posts,
            total,
            totalPage,
            currentPage: page,
        });

    } catch (error) {
        return res.status(400).json({
            message: "Đã có lỗi xẩy ra vui lòng thử lại sau.",
        });
    }
}

// [DELETE] posts/:id
export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostSchema.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Success", post });
    } catch (error) {
        res.status(400).json({ message: "Xóa không thành công", error });
    }
}


// [get] posts/:id
export const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostSchema.findById({ _id: id });
        res.status(200).json({ message: "Success", post });
    } catch (error) {
        res.status(400).json({ message: "Xóa không thành công", error });
    }
};

// [update] posts/:id
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { image, ...rest } = req.body;

        const fileImage = await cloudinary.uploader.upload(image);

        const body = { ...rest, image: fileImage.secure_url };

        const post = await PostSchema.findByIdAndUpdate({ _id: id }, body, {
            new: true,
        });

        return res.status(200).json({ message: "Success", post });

    } catch (error) {
        return res.status(400).json({ message: "Xóa không thành công", error });
    }
};