const lessonSchema =    `#graphql

type Lesson{
    id:ID!
    title:String!
    content:String!
    course:ID!
    createdAt:String
    updatedAt:String
}


type Query{
    fetchLesson(id:ID):Lesson
}

input InputLesson{
    id:ID!
    title:String!
    content:String!
    course:ID!
}

type Mutation{
    addLesson(param: InputLesson!):Lesson
     updateLesson(param: InputLesson!):Lesson
     deleteLesson(id: ID!):String
}


`

export default lessonSchema