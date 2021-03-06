// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha'
    ],
    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],
    files: [
      // Reference: https://ww.npmjs.com/package/phantomjs-polyfill
      // Needed because React.js requires bind and phantomjs does not support isparta-instrumenter-loader
      'node_modules/phantomjs-polyfill/bind-polyfill.js',

      //Grab all files in the tests directory that contains test.
      'tests/**/*_test.*'
    ],
    preprocessors: {
      // Reference: https://webpack.github.io/docs/testing.html-webpack-plugin
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'tests/**/*_test.*': ['webpack', 'sourcemap']
    },
    browsers: [
      // Run tests using phantomjs
      'PhantomJS'
    ],
    singleRun: true,

    //Configure code coverage reporter
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },
    // Test webpack config
    webpack: require('./webpack.config'),
    
    // Hide webpack build information from Output
    webpackMiddleware: {
      noInfo: true
    }
  });
};
