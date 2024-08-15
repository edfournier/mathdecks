import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    userId: String,
    streak: Number, 
    tally: Number,
    stamp: String
});

recordSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;  
    }
});
  
const Record = mongoose.model("Record", recordSchema);

export default Record;