import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mongoose from "mongoose";
import 'dotenv/config';

import CommentModel from "./models/commentModel.js";
import MovieModel from "./models/movieModel.js";
import UserModel from "./models/userModel.js";

import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    async comments() {
      const commentData = await CommentModel.find();
      return commentData;
    },
    async movies() {
      const movieData = await MovieModel.find();
      return movieData;
    },
    async users() {
      const userData = await UserModel.find();
      return userData;
    },
    async comment(_, args) {
      const commentById = await CommentModel.findOne({ _id: args.id });
      return commentById;
    },
    async movie(_, args) {
      const movieById = await MovieModel.findOne({ _id: args.id });
      return movieById;
    },
    async user(_, args) {
      const userById = await UserModel.findOne({ _id: args.id });
      return userById;
    },
    async movieByPlot(_, args) {
      return await MovieModel.findOne({ plot: args.plot });
    },
    async userByEmail(_, args) {
      return await UserModel.findOne({ email: args.email });
    },
  },
  Comment: {
    async movie(parent) {
      const data = await MovieModel.findOne({ _id: parent.movie_id });
      return data;
    },
    async userByEmail(parent) {
      return await UserModel.findOne({ email: parent.email });
    },
  },
  Mutation: {
    async deleteUser(_, args) {
      const deletedUser = await UserModel.findOne({ _id: args.id });
      if (deletedUser) {
        await UserModel.deleteOne({ _id: args.id });
        console.log("The deleted user is ", deletedUser);
      } else {
        console.log("User not found");
      }
      return await UserModel.find();
    },
    async addUser(_, { user }) {
      const newUser = new UserModel(user);
      await newUser.save();
      console.log("New user created", newUser)
      return newUser;
    },
    async updateUser(_, { id, edits }) {
      try {
        const updatedUser = await UserModel.findByIdAndUpdate(
          id,
          { $set: edits },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }

        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });
