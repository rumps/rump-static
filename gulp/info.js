'use strict';

var globule = require('globule');
var gulp = require('gulp');
var path = require('path');
var rump = require('rump');
var util = require('gulp-util');

gulp.task('rump:info:static', function() {
  var glob = path.join(rump.configs.main.paths.source.root,
                       rump.configs.main.paths.source.static,
                       rump.configs.main.globs.build.static);
  var files = globule.find([glob].concat(rump.configs.main.globs.global));
  var source = path.join(rump.configs.main.paths.source.root,
                         rump.configs.main.paths.source.static);
  var destination = path.join(rump.configs.main.paths.destination.root,
                              rump.configs.main.paths.destination.static);

  util.log('Static files are copied from', util.colors.green(source),
           'to', util.colors.green(destination));

  if(files.length) {
    util.log('Affected files:');
    files.forEach(function(file) {
      util.log(util.colors.blue(path.relative(source, file)));
    });
  }
});

gulp.tasks['rump:info'].dep.push('rump:info:static');
