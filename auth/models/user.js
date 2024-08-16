import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true },
    password: String,
    created: String
});

// Encrypts password before saving
userSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } 
    catch (err) {
        next(err);
    }
});

// Hashes given password and compares to the user's password
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id; 
        delete ret.password;
    }
});

// Mongoose searches for a collection with the model's name, but plural and lowercase: "User" -> "users"
const User = new mongoose.model("User", userSchema);

export default User;