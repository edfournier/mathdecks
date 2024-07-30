import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pass: {
        type: String,
        required: true,
    }
});

// Encrypts password when saving
schema.pre("save", async (next) =>  {
    try {
        if (this.isModified("pass")) {
            const salt = await bcrypt.genSalt(10);
            this.pass = await bcrypt.hash(this.pass, salt);
        }
        next();
    } 
    catch (err) {
        next(err);
    }
});

schema.method.comparePass = async function(pass) {
    return bcrypt.compare(pass, this.pass);
}

const User = new mongoose.model("User", schema);

export default User;