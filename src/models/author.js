import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const AuhtorSchema = new Schema(
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


AuhtorSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("authors", AuhtorSchema);