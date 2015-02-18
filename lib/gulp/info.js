'use strict';

var globule = require('globule');
var gulp = require('gulp');
var path = require('path');
var rump = require('rump');
var pkg = require('../../package');
var util = require('gulp-util');

gulp.task(rump.taskName('info:static'), function() {
  var glob = path.join(rump.configs.main.paths.source.root,
                       rump.configs.main.paths.source.static,
                       rump.configs.main.globs.build.static);
  var files = globule.find([glob].concat(rump.configs.main.globs.global));
  var source = path.join(rump.configs.main.paths.source.root,
                         rump.configs.main.paths.source.static);
  var destination = path.join(rump.configs.main.paths.destination.root,
                              rump.configs.main.paths.destination.static);

  if(!files.length) {
    return;
  }

  console.log();
  console.log(util.colors.magenta('--- Static', 'v' + pkg.version));
  console.log('Static files from', util.colors.green(source),
              'are copied to', util.colors.green(destination));
  console.log('Affected files:');
  files.forEach(function(file) {
    console.log(util.colors.blue(path.relative(source, file)));
  });

  console.log();
});

gulp.tasks[rump.taskName('info')].dep.push(rump.taskName('info:static'));
