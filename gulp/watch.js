'use strict';

var gulp = require('gulp');
var path = require('path');
var rump = require('rump');

gulp.task('rump:watch:static', ['rump:build:static'], function() {
  var glob = path.join(rump.configs.main.paths.source.root,
                       rump.configs.main.paths.source.static,
                       rump.configs.main.globs.watch.static);
  gulp.watch([glob].concat(rump.configs.main.globs.global),
             ['rump:build:static']);
});

gulp.tasks['rump:watch'].dep.push('rump:watch:static');
