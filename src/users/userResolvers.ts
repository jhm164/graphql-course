import UserMongoSchema from "./userMongoSchema";
// import jwt  from 'jsonwebtoken'
const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdasd32432tfsd54555asdas"
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
    login: async (_: any, { username,password }: any) => {
      try {
        
        const user = await UserMongoSchema.findOne({username:username,password:password});
        console.log(":user",user)
        if (!user) {
          throw new Error("Login Failed!");
        }
     const token =   jwt.sign({id:user._id,role:user.role,email:user.email},JWT_SECRET,{expiresIn:'1h'})
        return token;
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
