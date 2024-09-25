const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
   mode: isDevelopment ? "development" : "production",
   entry: "./src/index.tsx",
   devServer: {
      hot: true,
   },
   target: "web",
   output: {
      filename: "bundle.[hash].js",
      path: path.resolve(__dirname, "dist"),
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
      }),
   ],
   resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
   },
   module: {
      rules: [
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
               extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            use: 'ts-loader',
         },
         {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
      ],
   },
};
