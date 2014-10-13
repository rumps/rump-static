'use strict';

var chalk = require('chalk');
var globule = require('globule');
var gulp = require('gulp');
var path = require('path');
var rump = require('rump');
var pkg = require('../package');

gulp.task('rump:info:static', function() {
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
  console.log(chalk.magenta('--- Static', 'v' + pkg.version));
  console.log('Static files from', chalk.green(source),
              'are copied to', chalk.green(destination));
  console.log('Affected files:');
  files.forEach(function(file) {
    console.log(chalk.blue(path.relative(source, file)));
  });

  console.log();
});

gulp.tasks['rump:info'].dep.push('rump:info:static');
