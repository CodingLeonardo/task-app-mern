module.exports = {
  entry: "./src/client/index.jsx",
  output: {
    path: __dirname + "/src/public/js",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.jsx|js$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
    ],
  },
};
