import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PostTopicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
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


PostTopicSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("postTopic", PostTopicSchema);