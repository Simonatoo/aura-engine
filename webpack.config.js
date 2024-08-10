const path = require('path');

module.exports = {
  entry: './public/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // alias: [
    //   { '@components': path.resolve(__dirname, '../src/components') },
    //   { '@Engine': path.resolve(__dirname, '../src/core/Engine') },
    //   { '@GameObject': path.resolve(__dirname, '../src/GameObject') },
    // ]
  },
  output: {
    filename: 'game-engine.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GameEngine',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    open: true,
    devMiddleware: {
      writeToDisk: true, // Opcional, para escrever no disco
    },
  },
  mode: 'development',
};