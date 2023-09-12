import { responseError, responseSuccess } from "../helpers/response"
import userModel from "../models/users";
import userRepository from "../repositories/user.repository";


export const getAll = async (req, res) => {
    try {
        const users = await userModel.find();
        return responseSuccess(res, { message: "success", data: users });
    } catch (error) {
        return responseError(res, error);
    }
}

// [GET] /auth/login
export const login = (req, res) => {
    try {
        res.status(200).json({ message: "Login success", error });
    } catch (error) {
        res.status(200).json({ message: "Login failed", error });
    }
}

// [POST] /auth/register
export const register = async (req, res) => {
    try {
        const data = req.body;
        const user = await userModel(data).save();
        return responseSuccess(res, { message: "success", data: user });
    } catch (error) {
        return res.status(400).json({ message: "error", error: error });
    }
};

// [GET] /auth/getUser
export const getUser = async (req, res) => {
    try {
        return res.json({ message: "success", user: req.user });
    } catch (error) {
        console.error("Lỗi khi lấy người dùng từ cookies:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// [POST] /auth/logout
export const postLogout = async (req, res, next) => {
    // Lấy danh sách các cookie hiện có
    const cookies = req.cookies;

    // Duyệt qua từng cookie và xóa chúng
    for (const cookieName in cookies) {
        res.clearCookie(cookieName);
    }

    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công",
    });
}
