import { Role, User } from "@prisma/client";
import { GraphQLResolveInfo, GraphQLArgs } from "graphql";

import { AuthenticationError } from "apollo-server-micro";
import jwt from "jsonwebtoken";
import { Icontext } from "../graphql/resolvers";

export const createToken = (user: User) =>
  jwt.sign({ ...user }, `${process.env.TOKEN_SECRET}`);

export const getUserFromToken = (token: string) => {
  try {
    const user = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    return user;
    // return models.User.findOne({ id: user.id });
  } catch (e) {
    console.log(e);
    return null;
  }
};
type GraphQLFieldResolveFn = (
  source?: any,
  args?: any,
  context?: Icontext,
  info?: GraphQLResolveInfo
) => any;

export const authenticated =
  (next: GraphQLFieldResolveFn) =>
  (
    root: unknown,
    args: GraphQLArgs,
    context: Icontext,
    info: GraphQLResolveInfo
  ) => {
    if (!context.user) {
      throw new AuthenticationError("must authenticate");
    }

    return next(root, args, context, info);
  };

export const authorized =
  (role: Role, next: GraphQLFieldResolveFn) =>
  (
    root: unknown,
    args: GraphQLArgs,
    context: Icontext,
    info: GraphQLResolveInfo
  ) => {
    if (context.user.role !== role) {
      throw new AuthenticationError(`you must have ${role} role`);
    }

    return next(root, args, context, info);
  };
