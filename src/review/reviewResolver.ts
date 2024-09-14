import ReviewSchema from "./reviewMongoSchema";

const reviewResolver = {
  Query: {
    getReview: (_: any, { coursename }: any) => {
      return coursename;
    },
  },
  Mutation: {
    addReview: async (_: any, { param }: any) => {
      console.log(param);
      const addreview = new ReviewSchema(param);
      return await addreview.save();
    },
    updateReview: async (_: any, { param }: any) => {
      try {
        console.log(param);
        const updateData: any = await ReviewSchema.findByIdAndUpdate(param.id, {
          $set: param,
        });
        console.log(updateData);
        // console.log(id, username, email, password, role, enrolledCourses);
        return updateData;
      } catch (e: any) {
        console.log(e);
      }
    },
    deleteReview: async (_: any, { id }: any) => {
        try {
            console.log(id);
            const deleteReview = await ReviewSchema.deleteOne({ _id: id });
            console.log(deleteReview);
            if (deleteReview.acknowledged == true && deleteReview.deletedCount >= 1) {
              return "Data Deleted Successfully!";
            } else {
              return "Failed to Delete Data";
            }
          } catch (e: any) {
            console.log(e);
          }

    },
  },
};

export default reviewResolver;
