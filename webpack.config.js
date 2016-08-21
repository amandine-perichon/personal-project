module.exports = {
  entry: './src/client/index.js',
  output: 'bundle.js',
  module: {
    loaders: [
      { loader: 'babel-loader', test: /\.js$/, exclude: 'node_modules' } ]
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/login': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/logout': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/register': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/concepts': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/concept': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/myconcepts': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
}
