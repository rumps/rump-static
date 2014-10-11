'use strict';

var gulp = require('gulp');
var path = require('path');
var rump = require('rump');
var util = require('gulp-util');

gulp.task('rump:info:static', function() {
  var source = path.join(rump.configs.main.paths.source.root,
                         rump.configs.main.paths.source.static);
  var destination = path.join(rump.configs.main.paths.destination.root,
                              rump.configs.main.paths.destination.static);

  util.log('Static files are copied from', util.colors.green(source),
           'to', util.colors.green(destination));
});

gulp.tasks['rump:info'].dep.push('rump:info:static');
