require('@babel/register');

import { resolve, join } from 'path';
import * as pkg from './package.json';

function srcPath(subdir: string) {
  return join(__dirname, 'src', subdir);
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    path: join(__dirname, 'dist'),
    filename: `${pkg.name}.js`
  },
  plugins: [],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/react',
            '@babel/preset-env'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.(s?)css$/,
        include: join(__dirname, '/src/components'),
        use: [
          { loader: 'style-loader' }, // to inject the result into the DOM as a style block
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          { loader: 'sass-loader' } // to convert SASS to CSS
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: resolve(__dirname, 'node_modules', 'react'),
      'react-dom': resolve(__dirname, 'node_modules', 'react-dom'),
      '@constants': srcPath('constants'),
      '@types': srcPath('types'),
      '@utils': srcPath('utils')
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss']
  }, 
};