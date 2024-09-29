const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
   mode: isDevelopment ? "development" : "production",
   entry: "./src/index.tsx",
   devServer: {
      historyApiFallback: true,
      compress: true,
      hot: true,
      allowedHosts: "all",
   },
   target: "web",
   output: {
      filename: "bundle.[fullhash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, '/src/index.html'),
      }),
   ],
   resolve: {
      alias: {
         components: path.resolve(__dirname, 'src/components/'),
         styles: path.resolve(__dirname, 'src/styles/'),
         hooks: path.resolve(__dirname, 'src/hooks/'),
         assets: path.resolve(__dirname, 'src/assets/'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
            use: [ 'style-loader', 'css-loader', 'sass-loader'],
         },
         {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            type: "asset/resource",
         },
         {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
         },
      ],
   },
};
