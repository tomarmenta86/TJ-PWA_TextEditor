const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = {
  mode: 'development',
  entry: {
    main: './client/src/js/index.js',
    install: './client/src/js/install.js',
    'service-worker': './server/src/js/sr-sw.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      chunks: ['main'],
    }),
    new WebpackPwaManifest({
      name: 'J.A.T.E',
      short_name: 'J.A.T.E',
      description: 'Just Another Text Editor',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      icons: [
        {
          src: path.resolve('./client/src/assets/icons/icon_96x96.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new InjectManifest({
      swSrc: './server/src/js/sr-sw.js',
      swDest: 'service-worker.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
