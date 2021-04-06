const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const allMeals = { 
  breakfast: 'toast', 
  lunch: 'noodles', 
  dinner: 'pizza' 
};

const petList = [
	{ name: 'Fluffy', species: 'Dog' },
	{ name: 'Sassy', species: 'Cat' },
	{ name: 'Goldberg', species: 'Frog' }
];

const schema = buildSchema(`
enum MealTime {
  breakfast
  lunch 
  dinner
}

type About {
  message: String!
}

type Meal {
  description: String!
}

type Pet {
  name: String!
  species: String!
}

type Query {
  getAbout: About
  getMeal(time: MealTime!): Meal
  getPet(id: Int!): Pet
  allPets: [Pet!]!
}`);

const root = {
  getAbout: () => {
    return { message: 'Hello World' };
  },
  getMeal: ({ time }) => {
    const meal = allMeals[time];
    return { description: meal };
	},
  getPet: ({ id }) => {
    return petList[id];
  },
  allPets: () => {
    return petList;
  }
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
