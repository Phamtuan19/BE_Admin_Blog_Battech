// src/repositories/userRepository.js

import userModel from "../models/users";

class UserRepository {
    async getAll(data) {
        return userModel.find(data);
    }

    async findById(userId) {
        return userModel.findById(userId);
    }

    async findByEmail(email) {
        return userModel.findOne({ email });
    }

    async createUser(userData) {
        return userModel.create(userData);
    }

    async updateUser(userId, userData) {
        return userModel.findByIdAndUpdate(userId, userData, { new: true });
    }

    async deleteUser(userId) {
        return userModel.findByIdAndDelete(userId);
    }
}

const userRepository = new UserRepository()

export default userRepository
