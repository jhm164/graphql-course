const courseSchema =   `#graphql

type Course{
    id:ID!
    title:String!
    instructor:User
    lessons:[Lesson]
    reviews:[Review]
    category:String
    rating:Float
    createdAt:String
    updatedAt:String

}

type Query{
    getCourseById(id:ID!):Course
}

input CourseIput{
    title:String!
    description:String!
    instructor:ID
    lessons:[ID]
    review:[ID]
    category:String
    rating:Float
}

type Mutation{
    createCourse(input:CourseIput!):Course
    updateCourse(id:ID!,input:CourseIput!):Course
    deleteCourse(id:ID!):String
}


`
export default courseSchema