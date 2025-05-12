module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Prevent chunking during development to avoid JSONP issues
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.optimization.runtimeChunk = false;
        webpackConfig.optimization.splitChunks = {
          cacheGroups: {
            default: false,
          },
        };
      }
      
      // Ensure output.publicPath is set correctly
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: '/',
      };

      return webpackConfig;
    },
  },
  devServer: {
    hot: true,
    client: {
      overlay: false,
      progress: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
