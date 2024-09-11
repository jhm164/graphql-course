import UserMongoSchema from "./userMongoSchema";

const userResolver = {
  Query: {
    getUser: async (_: any, { id }: any) => {
      try {
        // console.log(id);

        // return {
        //   id: "asdad",
        //   username: "demo",
        //   email: "demo",
        //   password: "demo",
        //   role: "STUDENT",
        //   enrolledCourses: ["sadsad324324"],
        // };
        const user = await UserMongoSchema.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (e: any) {
        console.log(e);
      }
    },
  },
  Mutation: {
    addUser: async (_: any, parms: any) => {
      try {
        // console.log(parms);
        const newUser = new UserMongoSchema(parms);
        return await newUser.save();
        // return parms
      } catch (e: any) {
        console.log(e);
      }
    },
    updateUser: async (_: any, parms: any) => {
      try {
        const updateData: any = await UserMongoSchema.findByIdAndUpdate(
          parms.id,
          { $set: parms }
        );
        console.log(updateData);
        // console.log(id, username, email, password, role, enrolledCourses);
        return updateData;
      } catch (e: any) {
        console.log(e);
      }
    },
    deleteUser: async (_: any, parms: any) => {
      try {
        console.log(parms.id);
        const deleteUser = await UserMongoSchema.deleteOne({ _id: parms.id });
        console.log(deleteUser);
        if (deleteUser.acknowledged == true && deleteUser.deletedCount >= 1) {
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

export default userResolver;
