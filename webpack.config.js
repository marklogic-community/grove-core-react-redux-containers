const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'grove-core-react-redux-containers',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'grove-core-react-components': 'grove-core-react-components',
    react: 'react',
    'react-dom': 'react-dom',
    'react-redux': 'react-redux',
    redux: 'redux'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-3']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
