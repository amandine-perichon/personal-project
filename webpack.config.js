module.exports = {
  entry: './src/index.js',
  output: 'bundle.js',
  module: {
    loaders: [
      { loader: 'babel-loader', test: /\.js$/, exclude: 'node_modules' } ]
  },
  devtool: 'source-map'
}
