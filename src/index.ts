const { ApolloServer, gql } = require("apollo-server");
import userSchema from "./users/userSchema";
import userResolver from "./users/userResolvers";
import { connectDB } from "./connect/connect";
import lessonSchema from "./Lesson/lessonSchema";
import lessonResolver from "./Lesson/lessonResolver";

const server = new ApolloServer({typeDefs:[userSchema,lessonSchema],resolvers:[userResolver,lessonResolver] ,introspection: true, 
  playground: false,     })

server.listen().then(({url}:any)=>{
    connectDB()
    console.log("url:"+url)
})