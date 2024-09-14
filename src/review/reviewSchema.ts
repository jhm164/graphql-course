const reviewSchema =    `#graphql

type Review{
    id:ID!
    user:User
    course:String
    rating:Float
    comment:String
    createdAt:String
    updatedAt:String

}

type Query{
    getReview(courseName:String):Review
}

input InputReview{
    id:String
    course:String!
    rating:Float!
    comment:String!
}

type Mutation{
    addReview(param:InputReview!):Review
    updateReview(param:InputReview!):Review
    deleteReview(id:String!):String
}

`


export default reviewSchema