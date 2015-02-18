'use strict';

var extend = require('extend');
var rump = require('rump');

exports.rebuild = function() {
  rump.configs.main.globs = extend(true, {
    build: {
      static: '**/*'
    },
    watch: {
      static: '**/*'
    }
  }, rump.configs.main.globs);

  rump.configs.main.paths = extend(true, {
    source: {
      static: 'static'
    },
    destination: {
      static: ''
    }
  }, rump.configs.main.paths);
};

exports.rebuild();
