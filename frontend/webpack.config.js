const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

pluginsValidated = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(__dirname, "src/index.html"),
  }),
  new ExtractTextPlugin("style.css"),
];

if (process.env.NODE_ENV === "production") {
  pluginsValidated.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })
  );
  pluginsValidated.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: path.join(__dirname, "src/index.jsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: pluginsValidated,
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react"],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|ico|png|gif|svg)$/i,
        loader: "file-loader?name=img/[name].[ext]",
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
    ],
  },
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    headers: { "Cache-Control": "max-age=600" },
    historyApiFallback: true,
  },
};
