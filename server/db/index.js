const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-k9wvh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

function mongoConnection() {
  let state = {
    db: null
  }

  function get() {
    return state.db;
  }

  async function connect() {
    try {
      const client = await MongoClient.connect(url, { useNewUrlParser: true });

      state.db = client.db();
      return;
    }
    catch (e) {
      throw e;
    }
  }

  function close() {
    if (state.db) {
      state.db.close((err, res) => {
        state.db = null;
      });
    }
  }

  return {
    get,
    connect,
    close
  };
}

module.exports = mongoConnection();