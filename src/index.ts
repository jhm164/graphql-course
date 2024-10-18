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
import authDirective from "./authDirective";
import { makeExecutableSchema } from "graphql-tools";
const jwt = require("jsonwebtoken");
const JWT_SECRET1 = "asdasd32432tfsd54555asdas";



const  {authDirectiveTransformer,authDirectiveTypeDefs} = authDirective("auth")
var schema:any = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs,userSchema, lessonSchema, reviewSchema, courseSchema],
  resolvers: [userResolver, lessonResolver, reviewResolver, courseResolver],
})

schema = authDirectiveTransformer(schema)
const server = new ApolloServer({
  schema,
  introspection: true,
  playground: false,
  context: ({ req }: any) => {
    const token = req.headers?.authorization;
    if (token) {
      const justToken = token.startsWith("Bearer ")
        ? token.slice(7, token.length)
        : "";
      // console.log("justToken==",justToken)
      const verifyJwt = jwt.verify(justToken, JWT_SECRET1);
       console.log("verifyJwt==",verifyJwt)

      return {user:verifyJwt};
    } else {
      return "";
    }
  },
});

server.listen().then(({ url }: any) => {
  connectDB();
  console.log("url:" + url);
});
