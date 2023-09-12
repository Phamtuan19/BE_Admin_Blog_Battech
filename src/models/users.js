import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import mongooseAutoPopulate from "mongoose-autopopulate";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


UserSchema.pre("save", function (next) {
    this.password = this.bcryptPassword(this.password);
    next();
});

UserSchema.methods = {
    bcryptPassword(password) {
        if (!password) return "";
        return bcrypt.hashSync(password, 10);
    },
    authenticate(password) {
        return bcrypt.compareSync(password, this.password);
    },
};

UserSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("users", UserSchema);