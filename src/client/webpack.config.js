const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/client/src/home/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "build/",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(png)$/,
        loader: "image-webpack-loader",
        enforce: "pre",
      },
      {
        test: /\.(png|mp3)$/,
        loader: "url-loader",
        options: {
          // Images larger than 25 KB won’t be inlined
          limit: 25 * 1024,
        },
      },
    ],
  },
  plugins: [new TerserPlugin()],
  resolve: {
    extensions: [".ts", ".js", ".png"],
  },
};
