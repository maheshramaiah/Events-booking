const { GraphQLNonNull, GraphQLString } = require('graphql');
const { UserType } = require('../types');
const { addUser, verifyUser } = require('../../service/auth');

module.exports = {
  signup: {
    type: GraphQLString,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(_, args) {
      return addUser(args);
    }
  },
  signin: {
    type: GraphQLString,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(_, args) {
      return verifyUser(args);
    }
  },
};