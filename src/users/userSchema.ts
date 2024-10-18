const userSchema = `#graphql

enum Role{
    STUDENT
    INSTRUCTOR
    ADMIN
}


type User{
id: ID!
username:String!
email:String!
password:String! 
role: Role!
enrolledCourses:[ID]
}

type Query{
getUser(id:ID):User
login( username:String!, password:String!):String
}

type Mutation{
    addUser(id: ID!,
            username:String!,
            email:String!,
            password:String!,
            role: Role!,
            enrolledCourses:[ID]
            ):User

    updateUser(id: ID!,
            username:String,
            email:String,
            password:String,
            role: Role,
            enrolledCourses:[ID]):User

    deleteUser(id: ID!):String      
}
`;

export default userSchema;
