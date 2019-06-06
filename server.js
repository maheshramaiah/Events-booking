const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const query = require('./graphql/query');
const mutation = require('./graphql/mutation');
const db = require('./db');
const { authenticateUser } = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;
const middlewares = [bodyParser.json(), authenticateUser];

app.use('/graphql', middlewares, (req, res) => {
  graphqlHTTP({
    schema: new GraphQLSchema({
      query,
      mutation
    }),
    graphiql: true,
    context: {
      isAuthenticated: req.isAuthenticated,
      user: req.user
    },
    customFormatErrorFn: error => ({
      message: error.message
    })
  })(req, res)
});

(async function() {
  try {
    await db.connect();
    app.listen(port);

    console.log(`Server listening on port: ${port}`);
  }
  catch (err) {
    console.log(`Error connecting to DB: ${err}`);
  }
})();