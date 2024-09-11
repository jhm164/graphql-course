import LessonMongoSchema from "./lessonMongoSchema";

const lessonResolver = {
  Query: {
   async fetchLesson(_: any, {id}: any) {
      return await LessonMongoSchema.findById(id)

    },
  },
  Mutation: {
    async addLesson(_: any, { param }: any) {
      console.log("param", param);
      try {
        const addResult = new LessonMongoSchema(param);
        const addLesson = await addResult.save();
        console.log("addLesson === ", addLesson);
        return addLesson;
      } catch (e) {
        console.log("Error", e);
      }
    },
   async updateLesson(_: any,  { param }: any) {
      const updatelesson =   await LessonMongoSchema.findByIdAndUpdate(param.id,{$set:param})
      return updatelesson
    },
   async deleteLesson(_: any,  { id }: any) {

    const deleteResponse =  await LessonMongoSchema.deleteOne({_id:id})
    if(deleteResponse && deleteResponse.acknowledged==true && deleteResponse.deletedCount>=1){
        return "Lesson deleted Successfully!"
    }else{
         return "failed to delete record!"
    }
    },
  },
};

export default lessonResolver;
