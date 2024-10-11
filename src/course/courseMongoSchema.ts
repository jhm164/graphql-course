
import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  instructor:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
  lessons:[{type:mongoose.Schema.Types.ObjectId,ref:"lessons"}],
  reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"reviews"}],
  category:{type:String},
  ratings:{type:Number},
  createdAt:{type:Date,default:Date.now},
  updatedAt:{type:Date,default:Date.now}
});

const CourseMongo = mongoose.model("course", courseSchema);
export default CourseMongo;
