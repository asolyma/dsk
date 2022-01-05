import { authenticated, authorized } from "../lib/auth";
import prisma from "../prisma/prisma";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-micro";
import { AuthUser, Resolvers, User as Userr } from "./graphqltypes";
import { Context } from "apollo-server-core";
import { PrismaClient, User } from "@prisma/client";
import { IncomingMessage, OutgoingMessage } from "http";
export interface Icontext extends Context {
  prisma: PrismaClient;
  user: User;
  res: OutgoingMessage;
  req: IncomingMessage;
  createToken: (user: User) => string;
}
export const resolvers: Resolvers<Icontext> = {
  Query: {
    users: async (_, __, ctx, info) => {
      const users = await prisma.user.findMany({});
      if (users) {
        return users as unknown as Userr[];
      } else {
        throw new Error("no users");
      }
    },
    me: async (_, __, { user }) => {
      if (user) {
        return user as Userr;
      } else {
        return null;
      }
    },
  },
  Mutation: {
    signin: async (_, { input }, { prisma, createToken, res }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (user && bcrypt.compareSync(input.password, user.password)) {
        const token = createToken(user);
        res.setHeader(
          "Set-cookie",
          cookie.serialize("T_ACCESS_TOKEN", token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
        return { token, user };
      } else {
        throw new Error("incorrect user oor password");
      }
    },
    out: async (_, __, { user, res }) => {
      if (user) {
        res.setHeader(
          "Set-cookie",
          cookie.serialize("T_ACCESS_TOKEN", "deleted", {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
          })
        );
        return user;
      } else {
        throw new AuthenticationError("no user");
      }
    },

    signup: async (_, { input }, { prisma, createToken, res }) => {
      const salt = bcrypt.genSaltSync();

      const existing = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existing) {
        throw new Error("nope");
      }
      const { email, firstname, lastname, password, avatar, phonenumber } =
        input;
      // const user = await prisma.user.create({ data: { ...input } });
      const user = (await prisma.user.create({
        data: {
          email,
          firstname,
          lastname,
          password: bcrypt.hashSync(password, salt),
          avatar,
          phonenumber,
          role: "MEMBER",
        },
      })) as User;
      const token = createToken(user);
      res.setHeader(
        "Set-cookie",
        cookie.serialize("T_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production",
        })
      );
      return { token, user };
    },
  },
};
