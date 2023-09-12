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