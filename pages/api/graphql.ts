import { typeDefs } from "../../graphql/schema";
import { createToken, getUserFromToken } from "../../lib/auth";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import prisma from "../../prisma/prisma";
import { resolvers } from "../../graphql/resolvers";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "micro-cors";
const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context({ req, res }) {
    let user;
    const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
    if (token) {
      user = getUserFromToken(token);
    }
    return { req, res, prisma, createToken, user };
  },
});
const cors = Cors();
const startserver = server.start();

export default cors(async function (req, res) {
  await startserver;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
});
export const config = {
  api: {
    bodyParser: false,
  },
};
