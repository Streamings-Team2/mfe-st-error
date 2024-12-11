const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const publicPath = isProduction
    ? process.env.PUBLIC_PATH_PRODUCTION
    : process.env.PUBLIC_PATH_DEVELOPMENT;

  const remotes = isProduction
    ? 'mfe_st_host@https://d3ukptxqg81hnz.cloudfront.net/mfe-st-host/remoteEntry.js'
    : 'mfe_st_host@http://localhost:4200/remoteEntry.js';
  return {
    output: {

      publicPath: publicPath,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 4212,
      historyApiFallback: true,
      watchFiles: [path.resolve(__dirname, 'src')],
      onListening: function (devServer) {
        const port = devServer.server.address().port

        printCompilationMessage('compiling', port)

        devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
          setImmediate(() => {
            if (stats.hasErrors()) {
              printCompilationMessage('failure', port)
            } else {
              printCompilationMessage('success', port)
            }
          })
        })
      }
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        }, {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "mfe_st_error",
        filename: "remoteEntry.js",
        remotes: { 'components': remotes },
        exposes: {
          './Errors': './src/components/Errors.tsx',
          './ErrosPage': './src/components/pages/ErrorsPage.tsx',
          './NotFound': './src/components/pages/NotFound.tsx',
          './Unavailable': './src/components/pages/Unavailable.tsx',
          './ErrorBoundary': './src/components/ErrorBoundary.tsx',
          './BuggyComponent': './src/components/BuggyComponent.tsx',
          './PopupComponent': './src/components/Popups/PopupComponent.tsx'
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv()
    ],
  }
};
