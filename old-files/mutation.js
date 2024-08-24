var { graphql, buildSchema } = require("graphql");

var user = buildSchema(
  `
  type Query{
  _empty:String
  }

  enum Course{
  JAVA
  PYTHON
  }

  input User{
    id:ID!
    name:String!
    age:Int
    course:Course!
  }

  type UserReturn{
    id:ID!
    name:String!
    age:Int
     course:Course!
  }

    type Mutation{
        addUser(input:User):UserReturn
    
    }
    `
);

var resolvers = {
  addUser: (params) => {
    console.log(params.input)
    return params.input;
  },
};

graphql({
  schema: user,
  rootValue: resolvers,
  source: ` 
    mutation{
      addUser(input:{
      id:"2434dsada",
      name:"Ram"
      course:JAVA
      }){
      id
      name
      course
      }
    }
    
    `,
}).then((result) => {
  console.log(result);
});
