import { responseSuccess } from "../helpers/response";
import PostTopic from "../models/postTopic";
import PostSchema from '../models/post'

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

export const getAllTopicsWithPostCounts = async (req, res, next) => {
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
        console.log(req.query)
        // Lấy tất cả các chủ đề
        const topics = await PostTopic.find({
            [category]: { $regex: search, $options: "i" }
        }).sort({ [category]: sortDirection || 1 }) // Sử dụng object để xác định trường sắp xếp và hướng sắp xếp
            .skip(perPage)
            .limit(limit);

        const total = await PostTopic.countDocuments({
            [category]: { $regex: search, $options: "i" },
        });

        // Tạo một danh sách chứa thông tin chủ đề và tổng số bài viết
        const topicsWithPostCounts = [];

        // Lặp qua từng chủ đề
        for (const topic of topics) {
            // Đếm số bài viết có chủ đề này
            const postCount = await PostSchema.countDocuments({ topicId: topic._id });

            // Thêm thông tin chủ đề và tổng số bài viết vào danh sách
            topicsWithPostCounts.push({
                topic: topic,
                postCount: postCount,
            });
        }

        const totalPage = Math.ceil(total / limit);

        return res.json({
            message: "success", data: {
                data: topicsWithPostCounts,
                total,
                totalPage,
                currentPage: page,
            }
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const deleteTopic = async (req, res, next) => {
    try {
        const id = req.params.id;
        const topic = await PostTopic.findByIdAndDelete({ _id: id });

        res.status(200).json({ message: "Success", topic });
    } catch (error) {
        res.status(400).json({ message: "Xóa không thành công", error });
    }
}

export const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const topic = await PostTopic.findById({ _id: id });
        res.status(200).json({ message: "Success", data: topic });
    } catch (error) {
        res.status(400).json({ message: "Đã có lỗi xảy ra.", error });
    }
};

export const updateTopic = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const topic = await PostTopic.findByIdAndUpdate({ _id: id }, body, {
            new: true,
        });

        res.status(200).json({ message: "Success", data: topic });
    } catch (error) {
        return res.status(400).json({ message: "Update thất bại. Đã có lỗi xảy ra.", error });
    }
}