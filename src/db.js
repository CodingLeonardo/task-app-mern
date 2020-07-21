const mongoose = require("mongoose");

async function connect() {
  const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterdev.1lj7r.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
}

module.exports = connect;
