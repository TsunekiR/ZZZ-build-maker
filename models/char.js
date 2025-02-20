import mongoose, {Schema} from "mongoose";

const charSchema = new Schema(
    {
        charName: String,
        charType: String,
        charBaseAttack: Number,
    }
);

const char =  mongoose.models.char || mongoose.model("char", charSchema);

export default char;