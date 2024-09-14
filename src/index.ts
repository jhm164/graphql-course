const { ApolloServer, gql } = require("apollo-server");
import userSchema from "./users/userSchema";
import userResolver from "./users/userResolvers";
import { connectDB } from "./connect/connect";
import lessonSchema from "./lesson/lessonSchema";
import lessonResolver from "./lesson/lessonResolver";
import reviewResolver from "./review/reviewResolver";
import reviewSchema from "./review/reviewSchema";
import courseResolver from "./course/courseResolver";
import courseSchema from "./course/courseSchema";
courseSchema
const server = new ApolloServer({typeDefs:[userSchema,lessonSchema,reviewSchema,courseSchema],resolvers:[userResolver,lessonResolver,reviewResolver,courseResolver] ,introspection: true, 
  playground: false,     })

server.listen().then(({url}:any)=>{
    connectDB()
    console.log("url:"+url)
})