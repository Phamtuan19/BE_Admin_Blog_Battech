import postTopicModal from '../models/postTopic'


class PostTopicRepository {
    async getAll(data) {
        return postTopicModal.find(data);
    }

    async findById(userId) {
        return postTopicModal.findById(userId);
    }

    // async findByEmail(email) {
    //     return postTopicModal.findOne({ email });
    // }

    async create(userData) {
        return postTopicModal.create(userData);
    }

    async update(id, userData) {
        return postTopicModal.findByIdAndUpdate(userId, userData, { new: true });
    }

    async deleteId(id) {
        return postTopicModal.findByIdAndDelete(id);
    }
}

const postTopicRepository = new PostTopicRepository()

export default postTopicRepository
