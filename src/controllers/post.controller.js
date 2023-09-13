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
        const perPage = limit * page - limit;

        const posts = await PostSchema.find({
            name: { $regex: search, $options: "i" },
        }).skip(perPage)
            .limit(limit);

        const total = await PostSchema.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        const totalPage = Math.ceil(total / limit);
        return res.status(200).json({
            data: posts,
            total,
            totalPage,
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
    }
}