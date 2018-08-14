var path = require('path');

module.exports = {
    target: 'node',
    externals: ['fs', 'net', 'events', 'readline', 'stream'],
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
        ]
    },
    entry: {
        'entrypoint-http': ['./TypeScript/HttpNodeInstanceEntryPoint']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, './Content/Node'),
        filename: '[name].js'
    },
    mode: 'development'
};
