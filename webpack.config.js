const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // Define the entry points of our application (can be multiple for different sections of a website)
    entry: {
        main: './src/js/main.js',
    },

    // Define the destination directory and filenames of compiled resources
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "./dist")
    },

    // Define development options
    devtool: "source-map",

    // Define loaders
    module: {
        rules: [
            // Use babel for JS files
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }
            },
            // PostCSS, and Sass
            {
                test: /\.s(c|a)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer',
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            // Assets Modules
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|gif|jpe?g|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext]'
                }
            }
        ],
    },

    // Define used plugins
    plugins: [
        // Load .env file for environment variables in JS
        new Dotenv({
            path: "./.env"
        }),

        new CleanWebpackPlugin({}),

        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),

        new HtmlWebpackPlugin({
            title: 'Bootstrap 5 & WebPack 5 Boilerplate',
            template: 'src/index.html'
        }),
    ],
};