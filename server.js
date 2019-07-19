const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const query = require('./server/graphql/query');
const mutation = require('./server/graphql/mutation');
const db = require('./server/db');
const api = require('./server/api');
const { authenticateUser } = require('./server/middleware');

const app = express();
const port = process.env.PORT || 3000;
const middlewares = [bodyParser.json(), authenticateUser];

app.use(...middlewares);
app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: new GraphQLSchema({
      query,
      mutation
    }),
    graphiql: process.env.MODE === 'development',
    context: {
      isAuthenticated: req.isAuthenticated,
      user: req.user
    },
    customFormatErrorFn: error => ({
      message: error.message
    })
  })(req, res)
});
app.use('/api', api);
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
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