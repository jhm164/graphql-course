import { AuthenticationError } from "apollo-server";
import Lesson from "../lesson/lessonMongoSchema";
import Review from "../review/reviewMongoSchema";
import UserMongoSchema from "../users/userMongoSchema";
import CourseMongo from "./courseMongoSchema";

const courseResolver = {
  Query: {
    getCourseById: async (_: any, { id }: any,context:any) => {
      console.log("context==",context)
      const result = await CourseMongo.findById(id);

      // console.log("result", result);
      return result;
    },
  },
  Mutation: {
    createCourse: async (_: any, { input }: any) => {
      console.log("input==", input);
      const newCourse = new CourseMongo(input);
      return await newCourse.save();
    },

    updateCourse: async (_: any, { id, input }: any,context:any) => {
      console.log("input==", input);
      if(context.role==="INSTRUCTOR"){
        return await CourseMongo.findByIdAndUpdate(id, input, { new: true });
      }else{
        throw new AuthenticationError("User not allowed to update course")
      }
     
    },
    deleteCourse: async (_: any, { id }: any) => {
      const deleteResult: any = await CourseMongo.deleteOne({ _id: id });
      console.log("deleteResult==", deleteResult);
      if (
        deleteResult &&
        deleteResult.acknowledged == true &&
        deleteResult.deletedCount >= 1
      ) {
        return "Course deleted Successfully!";
      } else {
        return "failed to delete record!";
      }
    },
  },
  Course: {
    instructor: async (course: any) => {
      console.log("course==", course.instructor);
      const user = await UserMongoSchema.findById(course.instructor);
      return user;
    },
    lessons: async (course: any) => {
      console.log("course==", course.instructor);
      const lessonsData = await Lesson.find({ course: course.title });
      console.log("lesson", lessonsData);
      return lessonsData;
    },
  },
};

export default courseResolver;
