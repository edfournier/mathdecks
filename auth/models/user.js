import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
    username: { type: String, trim: true },
    password: String
});

// Encrypts password before saving
schema.pre("save", async function(next) {
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

schema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// Mongoose searches for a collection with the model's name, but plural and lowercase: "User" -> "users"
const User = new mongoose.model("User", schema);

export default User;