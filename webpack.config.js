// In your webpack.config.js
module.exports = {
    // ...
    resolve: {
      modules: [
        path.resolve(__dirname, '../utils'), // Add this
        'node_modules'
      ]
    }
  }