export const typeDefs = `#graphql
  scalar Date

  type Award {
    wins: Int!  
    nominations: Int!    
    text: String!  
  }

  type Imdb {
    rating: Float!  
    votes: Int!    
    id: String!  
  }

  type Viewer {
   rating: Float!
   numReviews: Int!
   meter: Int! 
  }

  type Critic {
   rating: Float!
   numReviews: Int!
   meter: Int! 
  }

  type Tomatoes {
   viewer: Viewer!
   fresh: Int!
   critic: Critic!
   rotten: Int!
   lastUpdated: Date!
  }

  type Comment {
    _id: ID!
    name: String!
    email: String!
    movie_id: ID!
    text: String!
    date: Date!
    movie: Movie!
    userByEmail: User!
  }

  type Movie {
    _id: ID!
    plot: String!
    genres: [String!]!
    runtime: Int!
    cast: [String!]!
    poster: String!
    title: String!
    fullplot: String!
    languages: [String!]!
    released: Date!
    directors: [String!]!
    rated: String!
    awards: Award
    lastupdated: Date!
    year: Int!
    imdb: Imdb!
    countries: [String!]!
    type: String!
    tomatoes: Tomatoes!
    num_mflix_comments: Int!
  }

  type User {
    _id: ID!
    name: String!
    email: String!  
    password: String!  
  }

  type Query {
    comments: [Comment]
    comment(id: ID!): Comment
    movies: [Movie]
    movie(id: ID!): Movie  
    movieByPlot(plot: String!): Movie  
    users: [User]  
    user(id: ID!): User
    userByEmail(email: String!): User  
  }

  type Mutation {
    addUser(user: AddUserInput):User
    deleteUser(id: ID!): [User]
    updateUser(id: ID!, edits: EditUserInput): User
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
  }

  input EditUserInput {
    name: String
    email: String
    password: String
  }
`;
