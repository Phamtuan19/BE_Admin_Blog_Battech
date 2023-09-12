import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PostsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'postTopic',
            autopopulate: { select: "name" }
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'authors',
            autopopulate: { select: "name" }
        },
        tagId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'tags',
            autopopulate: { select: "name" }
        },
        slug: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


PostsSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("posts", PostsSchema);