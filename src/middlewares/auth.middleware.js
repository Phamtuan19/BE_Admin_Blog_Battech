import jwt from 'jsonwebtoken'
import UserSchema from '../models/users'
import { responseError } from '../helpers/response';

const authMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await UserSchema.findOne({
            email: { $regex: email, $options: "i" }
        });

        if (!user) {
            return res.status(400).json({ message: "Tài khoản người dùng không tồn tại." });
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({ message: 'wrong password' });
        }

        user.password = null;

        const tokenUser = jwt.sign({ ...user }, process.env.SECRETKEY, {
            expiresIn: '24h'
        });

        res.cookie(process.env.COOKIE_NAME, tokenUser, {
            maxAge: 60 * 60 * 1000 * 24, // 30 ngày
            httpOnly: false, // Có thể truy cập bằng JavaScript
            secure: true, // Chỉ gửi qua HTTPS
            sameSite: 'none', // Cho phép gửi đến các tên miền khác
        })

        return res.status(200).json({
            message: 'Login success',
            user: user
        });
    } catch (error) {
        console.log(error)
        return responseError(res, error);
    }

};

export default authMiddleware