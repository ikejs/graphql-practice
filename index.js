const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const users = require('./test-data/users');
const songs = require('./test-data/songs');

const schema = buildSchema(`
enum RoleEnum {
  ADMIN
  LISTENER
  ARTIST
}

enum GenreEnum {
  FUNK
  POP
  HIPHOP
  EDM
}

type User {
  name: String!
  username: String!
  email: String!
  password: String!
  role: RoleEnum!
  songs: [Song!]!
}

type Song {
  title: String!
  artist: User!
  genre: GenreEnum!
}

type Query {
  getUser(id: String!): User
  allSongs: [Song]
}`);

const root = {
  getUser: ({ _id }) => {
    const user = users.find((user, i) => user._id == _id ? true : false)
    return user
	},
  allSongs: () => songs
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
