import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


TagSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("tags", TagSchema);