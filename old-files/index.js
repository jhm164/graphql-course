var { graphql, buildSchema } = require("graphql");

var schema = buildSchema(
  `
    type Query {
        user:String
        rollnumber:Int
    }
    `
);  

var rootValue = {
  user() {
    return "Ram";
  },
  rollnumber(){
    return 7
  }
};

graphql({
    schema,
    rootValue,
    source:"query { rollnumber }"
}).then(response=>{
    console.log("response == ",response)
})