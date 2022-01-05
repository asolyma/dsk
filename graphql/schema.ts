import { gql } from "apollo-server-micro";
// import { GraphQLScalarType, Kind } from "graphql";

// const dateScalar = new GraphQLScalarType({
//   name: "Date",
//   description: "Date custom scalar type",
//   serialize(value) {
//     return value.getTime(); // Convert outgoing Date to integer for JSON
//   },
//   parseValue(value) {
//     return new Date(value); // Convert incoming integer to Date
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
//     }
//     return null; // Invalid hard-coded value (not an integer)
//   },
// });

export const typeDefs = gql`
  enum Role {
    ADMIN
    MEMBER
    GUEST
  }

  type User {
    id: String!
    firstname: String!
    lastname: String!
    phonenumber: String!
    email: String!
    password: String!
    avatar: String
    role: Role!
  }
  type Query {
    users: [User]
    me: User
  }

  type AuthUser {
    token: String!
    user: User!
  }
  input signupInput {
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    phonenumber: String!
    avatar: String
  }
  input signinInput {
    email: String!
    password: String!
  }
  type Message {
    message: String!
  }

  type Mutation {
    signup(input: signupInput!): AuthUser!
    signin(input: signinInput!): AuthUser!
    out: User!
    checkin: Message!
    checkout: Message
    users: [User]
  }
`;
