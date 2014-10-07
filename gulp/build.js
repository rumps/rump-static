'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var rump = require('rump');
var util = require('gulp-util');

gulp.task('rump:build:static', function() {
  var source = path.join(rump.configs.main.paths.source.root,
                         rump.configs.main.paths.source.static,
                         rump.configs.main.globs.build.static);
  var destination = path.join(rump.configs.main.paths.destination.root,
                              rump.configs.main.paths.destination.static);

  return gulp
  .src([source].concat(rump.configs.main.globs.global))
  .pipe((rump.configs.watch ? plumber : util.noop)())
  .pipe((rump.configs.watch ? changed : util.noop)(destination))
  .pipe(gulp.dest(destination));
});

gulp.tasks['rump:build'].dep.push('rump:build:static');
