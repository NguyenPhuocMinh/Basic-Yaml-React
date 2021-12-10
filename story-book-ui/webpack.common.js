require('babel-polyfill');

const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill', // for async func
    './src/index.js' // root
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                tag: 'link',
                attribute: 'href',
                type: 'src'
              }
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    alias: {
      // for jest test
      config$: 'jest.config.js'
    },
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules'
    ]
  },
  performance: {
    // This option allows you to whitelist services that are allowed to access the dev server.
    hints: 'error',
    maxAssetSize: 20000000000,
    maxEntrypointSize: 40000000000
  },
  stats: {
    env: true,
    // include value of --env in the output
    outputPath: true,
    // include absolute output path in the output
    publicPath: true,
    // include public path in the output
    assets: true,
    // show list of assets in output
    /* Advanced assets settings (click to show) */
    entrypoints: true,
    // show entrypoints list
    chunkGroups: true,
    // show named chunk group list
    chunks: true,
    // show list of chunks in output
    modules: true,
    children: true,
    // show stats for child compilations
    logging: true,
    // show logging in output
    loggingDebug: /webpack/,
    // show debug type logging for some loggers
    loggingTrace: true,
    // show stack traces for warnings and errors in logging output
    warnings: true,
    // show warnings
    errors: true,
    // show errors
    errorDetails: true,
    // show details for errors
    errorStack: true,
    // show internal stack trace for errors
    moduleTrace: true,
    // show module trace for errors
    builtAt: true,
    // show timestamp in summary
    errorsCount: true,
    // show errors count in summary
    warningsCount: true,
    // show warnings count in summary
    timings: true,
    // show build timing in summary
    version: true,
    // show webpack version in summary
    hash: true
    // show build hash in summary
  },
  devServer: {
    // Tells dev-server to open the browser after server had been started. Set it to true to open your default browser.
    open: true,
    // Enable gzip compression for everything served
    compress: true,
    // This option allows you to whitelist services that are allowed to access the dev server.
    allowedHosts: 'all',
    // Specify a port number to listen for requests on:
    port: 4000,
    // Enable webpack's Hot Module Replacement feature
    host: 'localhost',
    // for reload page not found 404 responses
    historyApiFallback: true,
    // With a backend on localhost:7979, you can use this to enable proxying:
    proxy: {
      '/rest/api': 'http://0.0.0.0:7979'
    },
    static: {
      directory: path.join(__dirname, 'public')
    },
    client: {
      logging: 'info',
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings.
      overlay: {
        errors: true,
        warnings: false
      },
      // Prints compilation progress in percentage in the browser.
      progress: true,
      // Tells dev-server the number of times it should try to reconnect the client. When true it will try to reconnect unlimited times.
      reconnect: 3
    }
  }
};
