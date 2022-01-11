const path = require('path')
const html = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {   
                test: /\.js/,
                exclude: /node_module/,
                use: [
                {loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",

                        ],
                        plugins: [
                            "transform-class-properties",
                            "transform-object-rest-spread"
                        ]
                    }
                },
            ]
            },
            {
                test: /\.css$/,
                use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
                ]
            }
        ]
    },
    plugins: [
        new html({
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", "jsx"],
        fallback: { 
            path: require.resolve("path-browserify"),
            os: require.resolve("os-browserify/browser"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify")
        },   
    }
}