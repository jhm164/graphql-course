const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const lessonSchema = new Schema({
    id:{type:String,require:true},
    title:{type:String,require:true},
    content:{type:String,require:true},
    course:{type:String,require:true},
    createdAt:{type:Date,require:true},
    updatedAt:{type:Date,require:true},

})

const LessonMongoSchema = mongoose.model("lesson",lessonSchema)
export default LessonMongoSchema