'use strict';

var merge = require('merge');
var rump = require('rump');

exports.rebuild = function() {
  rump.configs.main.globs = merge.recursive({
    build: {
      static: '**/*'
    },
    watch: {
      static: '**/*'
    }
  }, rump.configs.main.globs);

  rump.configs.main.paths = merge.recursive({
    source: {
      static: 'static'
    },
    destination: {
      static: ''
    }
  }, rump.configs.main.paths);
};

exports.rebuild();
