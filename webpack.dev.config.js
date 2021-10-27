const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const aliases = require('./aliases');

module.exports = {
    mode: 'development',
    
    // Define the entry points of our application (can be multiple for different sections of a website)
    entry: {
        main: './src/index.js',
    },

    // Define the destination directory and filenames of compiled resources
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "./dist")
    },

    resolve: {
        alias: aliases
    },

    // Define loaders
    module: {
        rules: [
            // Use babel for JS files
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: "babel-loader"
            },
            // PostCSS, and Sass
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
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
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            additionalData: '@import "~/src/scss/_bootstrap-base.scss";'
                        }
                    }
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
        new HtmlWebpackPlugin({
            title: 'BKOOL session manager',
            template: 'src/template.html'
        }),
    ],
};