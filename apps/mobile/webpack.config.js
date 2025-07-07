const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add workspace packages to the resolver
  config.resolve.alias = {
    ...config.resolve.alias,
    '@blockit/cross-ui-toolkit': path.resolve(__dirname, '../../packages/cross-ui-toolkit'),
  };

  // Add workspace packages to the modules
  config.resolve.modules = [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../../node_modules'),
    ...config.resolve.modules,
  ];

  // Configure image handling
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: '/images/',
        },
      },
    ],
  });

  return config;
}; 