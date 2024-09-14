import exp from "constants";
import mongoose, { Schema } from "mongoose";


const  reviewMongoSchema = new Schema({

course: { type:String,require:true},
rating: { type:String,require:true},
comment: { type:String,require:true}

})

const ReviewSchema = mongoose.model("review",reviewMongoSchema)

export default ReviewSchema